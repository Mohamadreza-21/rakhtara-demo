import { useCallback } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { CATEGORIES } from "../lib/data/products";
import { useProductListing } from "../lib/hooks/useProductListing";
import ProductListing from "../features/storefront/components/ProductListing";

export default function AllProductsPage() {
	const { addToCart } = useOutletContext();
	const [searchParams, setSearchParams] = useSearchParams();

	const activeCategoryId = searchParams.get("category") || "all";
	const activeCategory = CATEGORIES.find((category) => category.id === activeCategoryId) || null;

	const listing = useProductListing({ category: activeCategory?.name });

	const selectCategory = useCallback(
		(id) => setSearchParams(id === "all" ? {} : { category: id }),
		[setSearchParams],
	);

	return (
		<div>
			<section className="relative overflow-hidden bg-forest">
				<svg
					className="absolute inset-0 w-full h-full opacity-10"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<pattern
							id="weave-products"
							width="46"
							height="46"
							patternUnits="userSpaceOnUse"
							patternTransform="rotate(45)"
						>
							<line x1="0" y1="0" x2="0" y2="46" stroke="#D4A94E" strokeWidth="1" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#weave-products)" />
				</svg>

				<div className="relative max-w-7xl mx-auto px-6 py-14">
					<div className="flex items-center gap-2 text-sm mb-6 text-cream/70">
						<Link to="/" className="hover:underline hover:text-cream">
							خانه
						</Link>
						<ChevronLeft size={14} />
						<span className="text-cream">محصولات</span>
					</div>

					<div className="flex items-end justify-between flex-wrap gap-4">
						<div>
							<h1 className="text-3xl md:text-4xl font-extrabold text-cream mb-3">
								{activeCategory ? activeCategory.name : "همه محصولات"}
							</h1>
							<p className="text-cream/70">
								{listing.initialLoading
									? "در حال بارگذاری..."
									: `${listing.total.toLocaleString("fa-IR")} محصول`}
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							<button
								type="button"
								onClick={() => selectCategory("all")}
								className={`cursor-pointer text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
									activeCategoryId === "all"
										? "bg-cream text-forest border-cream"
										: "border-cream/30 text-cream hover:bg-cream/10"
								}`}
							>
								همه
							</button>
							{CATEGORIES.map((category) => (
								<button
									key={category.id}
									type="button"
									onClick={() => selectCategory(category.id)}
									className={`cursor-pointer text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
										category.id === activeCategoryId
											? "bg-cream text-forest border-cream"
											: "border-cream/30 text-cream hover:bg-cream/10"
									}`}
								>
									{category.emoji} {category.name}
								</button>
							))}
						</div>
					</div>
				</div>
				<div className="absolute inset-0 -z-10 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%)]" />
			</section>

			<div className="max-w-7xl mx-auto px-6 py-10">
				<ProductListing
					listing={listing}
					onAdd={addToCart}
					errorSubject="لیست محصولات"
					emptyMessage="محصولی یافت نشد"
				/>
			</div>
		</div>
	);
}
