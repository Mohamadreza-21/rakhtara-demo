import CategoryNotFound from "../components/errors/notfound/CategoryNotFound";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { CATEGORIES } from "../lib/data/products";
import { useProductListing } from "../lib/hooks/useProductListing";
import ProductListing from "../features/storefront/components/ProductListing";

export default function CategoryPage() {
	const { id } = useParams();
	const { addToCart } = useOutletContext();

	const category = CATEGORIES.find((currentCategory) => currentCategory.id === id) || null;
	const listing = useProductListing({ category: category?.name });

	if (!category) {
		return <CategoryNotFound />;
	}

	return (
		<div>
			<section
				className={`relative overflow-hidden ${category?.bg || "bg-forest"}`}
			>
				<div className="max-w-7xl mx-auto px-6 py-14">
					<div className="flex items-center gap-2 text-sm mb-6 text-cream/70">
						<Link to="/" className="hover:underline hover:text-cream">
							خانه
						</Link>
						<ChevronLeft size={14} />
						<Link to="/#categories" className="hover:underline hover:text-cream">
							دسته‌بندی‌ها
						</Link>
						<ChevronLeft size={14} />
						<span className="text-cream">{category?.name}</span>
					</div>

					<div className="flex items-end justify-between flex-wrap gap-4">
						<div>
							<h1 className="text-3xl md:text-4xl font-extrabold text-cream mb-3">
								<span className="me-2">{category?.emoji}</span>
								{category?.name}
							</h1>
							<p className="text-cream/70">
								{listing.initialLoading ? "در حال بارگذاری..."
									: `${listing.total.toLocaleString("fa-IR")} محصول در این دسته‌بندی`}
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							{CATEGORIES.map((currentCategory) => (
								<Link
									key={currentCategory.id}
									to={`/category/${currentCategory.id}`}
									className={`text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
										currentCategory.id === id
											? "bg-cream text-forest border-cream"
											: "border-cream/30 text-cream hover:bg-cream/10"
									}`}
								>
									{currentCategory.emoji} {currentCategory.name}
								</Link>
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
					errorSubject="محصولات این دسته‌بندی"
					emptyMessage="محصولی در این دسته‌بندی موجود نیست"
				/>
			</div>
		</div>
	);
}
