import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../../lib/query/keys";
import { ChartSkeleton } from "../../../../components/skeletons/CmsSkeletons";
import ErrorState from "../../../../components/errors/ErrorState";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";
import { ChartTooltip } from "../../ui";
import { countUsers } from "../../../../services/users";
import { countProducts } from "../../../../services/products";

async function fetchChartData() {
	const roles = ["مشتری", "پشتیبانی", "مدیر فروشگاه"];
	const [products, ...byRole] = await Promise.all([
		countProducts(),
		...roles.map((role) => countUsers({ role })),
	]);

	return [
		...roles.map((label, index) => ({ label, value: byRole[index] })),
		{ label: "محصولات", value: products },
	];
}

export default function RegistrationsChart() {
	const { data = [], isPending: loading, error, refetch: reload } = useQuery({ queryKey: keys.stats.chart, queryFn: fetchChartData });

	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]">
			<div className="flex items-center justify-between mb-6">
				<span className="text-sm text-[#6B7280] font-medium">
					کاربران ثبت‌نامی و محصولات
				</span>
				<h3 className="font-bold text-lg text-[#111827]">آمار کلی داشبورد</h3>
			</div>
			<div className="h-72 w-full" dir="ltr">
				{loading ? (
					<ChartSkeleton />
				) : error ? (
					<ErrorState
						error={error}
						theme="cms"
						variant="inline"
						subject="نمودار آمار"
						onRetry={reload}
						className="h-full flex items-center justify-center py-4!"
					/>
				) : (
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={data}
							margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
							barCategoryGap="35%"
						>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="#F1F2F6"
								vertical={false}
							/>
							<XAxis
								dataKey="label"
								reversed
								tick={{ fill: "#9CA3AF", fontSize: 12 }}
								axisLine={{ stroke: "#EEF0F5" }}
								tickLine={false}
							/>
							<YAxis
								tick={{ fill: "#9CA3AF", fontSize: 12 }}
								axisLine={false}
								tickLine={false}
								allowDecimals={false}
							/>
							<Tooltip
								cursor={{ fill: "#F7F8FB" }}
								content={<ChartTooltip />}
							/>
							<Bar
								dataKey="value"
								fill="#6C63FF"
								radius={[8, 8, 0, 0]}
								maxBarSize={64}
							/>
						</BarChart>
					</ResponsiveContainer>
				)}
			</div>
		</div>
	);
}
