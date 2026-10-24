import { useCallback } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { fadeUp, stagger } from "../../../lib/motion";
import { SORT_OPTIONS } from "../../../lib/productSort";
import ProductsNotFound from "../../../components/errors/notfound/ProductsNotFound";
import ErrorState from "../../../components/errors/ErrorState";
import SearchInput from "../../../components/shared/SearchInput";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { ProductGridSkeleton, ProductListingFetchSkeleton } from "./ProductCardSkeleton";

export default function ProductListing({ listing, onAdd, errorSubject, emptyMessage }) {
	const { items, total, pages, page, setPage, search, sort, setSort, pageSize } = listing;

	const handlePageChange = useCallback(
		(nextPage) => {
			setPage(nextPage);
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
		[setPage],
	);

	return (
		<>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
				<SearchInput
					value={search.input}
					onChange={search.setInput}
					placeholder="جستجوی محصول..."
					className="w-full sm:max-w-xs"
				/>
				<label className="flex items-center justify-between sm:justify-start gap-2 text-sm font-semibold text-ink/70 bg-white border border-ink/10 rounded-full px-4 py-2">
					<span className="flex items-center gap-2">
						<SlidersHorizontal size={16} className="text-forest" />
						مرتب‌سازی:
					</span>
					<select
						value={sort}
						onChange={(event) => setSort(event.target.value)}
						className="cursor-pointer bg-transparent outline-none font-bold text-forest"
					>
						{SORT_OPTIONS.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</label>
			</div>

			{listing.initialLoading ? (
				<ProductGridSkeleton count={pageSize} />
			) : listing.error ? (
				<ErrorState error={listing.error} subject={errorSubject} variant="inline" onRetry={listing.reload} />
			) : items.length === 0 ? (
				<ProductsNotFound query={search.query} emptyMessage={emptyMessage} onClear={() => search.setInput("")} />
			) : (
				<>
					<p className="text-sm text-ink/50 mb-6">
						نمایش {items.length.toLocaleString("fa-IR")} از {total.toLocaleString("fa-IR")} محصول
					</p>
					{listing.fetching ? (
						<ProductListingFetchSkeleton count={pageSize} />
					) : (
						<motion.div
							key={`${page}-${sort}-${search.query}`}
							variants={stagger(0.05)}
							initial="hidden"
							animate="show"
							className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
						>
							{items.map((product) => (
								<motion.div key={product.id} variants={fadeUp}>
									<ProductCard product={product} onAdd={onAdd} />
								</motion.div>
							))}
						</motion.div>
					)}
					<Pagination currentPage={page} totalPages={pages} onPageChange={handlePageChange} />
				</>
			)}
		</>
	);
}
