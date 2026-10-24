import { ListCardSkeleton } from "../../../../components/skeletons/CmsSkeletons";
import ErrorState from "../../../../components/errors/ErrorState";
import { ArrowLeft, ImageOff } from "lucide-react";
import { StockPill } from "../../ui";
import { toman } from "../../../../lib/data/products";
import { getProductsPage } from "../../../../services/products";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../../lib/query/keys";

async function fetchRecentProducts() {
	return (await getProductsPage({ page: 1, perPage: 5, sort: "newest" })).items;
}

export default function RecentProducts() {
	const navigate = useNavigate();
	const { data: products = [], isPending: loading, error, refetch: reload } = useQuery({ queryKey: keys.products.recent, queryFn: fetchRecentProducts });

	const recentProducts = products;

	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]">
			<div className="flex items-center justify-between mb-5">
				<button
					onClick={() => navigate("/admin/products")}
					className="cursor-pointer flex items-center gap-1 text-xs font-medium text-[#6C63FF] hover:text-[#4F46E5] transition"
				>
					مشاهده همه <ArrowLeft size={13} />
				</button>
				<h3 className="font-bold text-[#111827]">۵ محصول آخر</h3>
			</div>
			{loading ? (
				<ListCardSkeleton rows={5} />
			) : error ? (
				<ErrorState
					error={error}
					theme="cms"
					variant="inline"
					subject="آخرین محصولات"
					onRetry={reload}
				/>
			) : (
			<div className="flex flex-col divide-y divide-[#F5F6FA]">
				{recentProducts.map((product) => (
					<div
						key={product.sku || product.id}
						className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
					>
						<div className="text-left">
							<div className="text-sm font-semibold text-[#111827] tabular-nums">
								{toman(product.price)}
							</div>
							<StockPill stock={product.stock} />
						</div>
						<div className="flex items-center gap-3">
							<div className="text-right">
								<div className="text-sm font-medium text-[#111827]">
									{product.name}
								</div>
								<div className="text-xs text-[#9CA3AF] mt-0.5">{product.cat}</div>
							</div>
							<div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F5F6FA] flex items-center justify-center shrink-0">
								{product.image ? (
									<img loading="lazy" decoding="async"
										src={product.image}
										alt={product.name}
										className="w-full h-full object-cover"
									/>
								) : (
									<ImageOff size={16} className="text-[#9CA3AF]" />
								)}
							</div>
						</div>
					</div>
				))}
				{recentProducts.length === 0 && (
					<div className="text-center py-6 text-sm text-[#9CA3AF]">
						محصولی یافت نشد
					</div>
				)}
			</div>
			)}
		</div>
	);
}
