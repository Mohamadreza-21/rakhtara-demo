import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../../lib/motion";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../lib/query/keys";
import { getFeaturedProducts } from "../../../services/products";
import ErrorState from "../../../components/errors/ErrorState";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "./ProductCardSkeleton";

const FEATURED_COUNT = 9;

const fetchFeatured = () => getFeaturedProducts(FEATURED_COUNT);

export default function ProductsSection({ onAdd }) {
	const { data: featuredProducts = [], isPending: loading, error, refetch: reload } = useQuery({ queryKey: keys.products.featured(FEATURED_COUNT), queryFn: fetchFeatured });

	return (
		<section id="products" className="max-w-7xl mx-auto px-6 py-20">
			<div className="flex items-end justify-between mb-14 flex-wrap gap-4">
				<div>
					<h2 className="text-3xl font-extrabold text-forest mb-3">
						محصولات ویژه
					</h2>
					<p className="text-ink/60">پرستاره‌ترین محصولات فروشگاه</p>
				</div>
				<Link to="/products" className="text-rust font-semibold hover:underline">
					مشاهده همه ←
				</Link>
			</div>
			{loading ? (
				<ProductGridSkeleton count={FEATURED_COUNT} />
			) : error ? (
				<ErrorState
					error={error}
					variant="inline"
					subject="محصولات ویژه"
					onRetry={reload}
				/>
			) : (
				<motion.div
					variants={stagger(0.07)}
					initial="hidden"
					animate="show"
					className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{featuredProducts.map((product) => (
						<motion.div key={product.id} variants={fadeUp}>
							<ProductCard
								product={product}
								onAdd={onAdd}
								rating={product.rating}
							/>
						</motion.div>
					))}
				</motion.div>
			)}
		</section>
	);
}
