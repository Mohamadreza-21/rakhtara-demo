import { useQuery } from "@tanstack/react-query";
import { keys } from "../lib/query/keys";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";
import { StatCardsSkeleton } from "../components/skeletons/CmsSkeletons";
import ErrorState from "../components/errors/ErrorState";
import { PageHeader, StatCard } from "../features/cms/ui";
import RegistrationsChart from "../features/cms/features/dashboard/RegistrationsChart";
import RecentProducts from "../features/cms/features/dashboard/RecentProducts";
import RecentUsers from "../features/cms/features/dashboard/RecentUsers";
import ShowcaseImagesManager from "../features/cms/features/dashboard/ShowcaseImagesManager";
import ContactInfoSection from "../features/cms/features/dashboard/ContactInfoSection";
import ContactMessagesSection from "../features/cms/features/dashboard/ContactMessagesSection";
import { statCardIcons } from "../lib/data/mockData";
import { countProducts } from "../services/products";
import { countUsers } from "../services/users";
import { countOf } from "../services/paging";
import { PANEL_ROLES } from "../lib/roles";

async function fetchCounts() {
	const [products, users, comments, ...roleCounts] = await Promise.all([
		countProducts(),
		countUsers(),
		countOf("/comments"),
		...PANEL_ROLES.map((role) => countUsers({ role })),
	]);

	return {
		managers: roleCounts.reduce((sum, n) => sum + n, 0),
		comments,
		users,
		products,
	};
}

const EMPTY_COUNTS = { managers: 0, comments: 0, users: 0, products: 0 };

export default function Dashboard() {
	const { data: counts = EMPTY_COUNTS, isPending: loading, error, refetch: reload } = useQuery({ queryKey: keys.stats.dashboard, queryFn: fetchCounts });

	const statCards = [
		{
			label: "تعداد مدیران",
			value: counts.managers.toLocaleString("fa-IR"),
			suffix: "عدد",
			icon: statCardIcons.managers,
		},
		{
			label: "تعداد تیکت‌ها",
			value: counts.comments.toLocaleString("fa-IR"),
			suffix: "عدد",
			icon: statCardIcons.tickets,
		},
		{
			label: "تعداد کاربران",
			value: counts.users.toLocaleString("fa-IR"),
			suffix: "عدد",
			icon: statCardIcons.users,
		},
		{
			label: "تعداد محصولات",
			value: counts.products.toLocaleString("fa-IR"),
			suffix: "عدد",
			icon: statCardIcons.products,
		},
	];

	return (
		<div className="space-y-6 ">
			<PageHeader title="داشبورد" />

			{loading ? (
				<StatCardsSkeleton />
			) : error ? (
				<ErrorState
					error={error}
					theme="cms"
					variant="inline"
					subject="آمار داشبورد"
					onRetry={reload}
				/>
			) : (
				<motion.div
					variants={stagger(0.08)}
					initial="hidden"
					animate="show"
					className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
				>
					{statCards.map((statCard) => (
						<motion.div key={statCard.label} variants={fadeUp} whileHover={{ y: -4 }}>
							<StatCard
								label={statCard.label}
								value={statCard.value}
								suffix={statCard.suffix}
								icon={statCard.icon}
							/>
						</motion.div>
					))}
				</motion.div>
			)}

			<RegistrationsChart />

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				<RecentProducts />
				<RecentUsers />
			</div>

			<ShowcaseImagesManager />

			<ContactInfoSection />

			<ContactMessagesSection />
		</div>
	);
}
