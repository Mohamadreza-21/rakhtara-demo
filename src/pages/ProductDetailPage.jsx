import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";
import ErrorState from "../components/errors/ErrorState";
import ProductNotFound from "../components/errors/notfound/ProductNotFound";
import { CATEGORIES } from "../lib/data/products";
import { useProduct } from "../lib/hooks/useProduct";
import { keys } from "../lib/query/keys";
import ProductComments from "../features/storefront/components/ProductComments";
import ProductDetailSkeleton from "../features/storefront/components/ProductDetailSkeleton";
import ProductBreadcrumb from "../features/product/components/ProductBreadcrumb";
import ProductGallery from "../features/product/components/ProductGallery";
import ProductInfo from "../features/product/components/ProductInfo";
import PurchasePanel from "../features/product/components/PurchasePanel";
import { PRODUCT_TABS, PURCHASE_PANEL_ID } from "../features/product/components/constants";
import ProductPerks from "../features/product/components/ProductPerks";
import ProductTabs from "../features/product/components/ProductTabs";
import ProductSpecs from "../features/product/components/ProductSpecs";
import MobilePurchaseBar from "../features/product/components/MobilePurchaseBar";
import RelatedProductsSlider from "../features/product/components/RelatedProductsSlider";

export default function ProductDetailPage() {
	const { id } = useParams();
	const { addToCart } = useOutletContext();

	const queryClient = useQueryClient();
	const { data: product, isPending: loading, error, refetch: reload } = useProduct(id);

	const handleProductChange = useCallback(
		(updated) => queryClient.setQueryData(keys.products.detail(id), updated),
		[queryClient, id],
	);

	const [tab, setTab] = useState(PRODUCT_TABS.description);

	const showReviews = useCallback(() => {
		setTab(PRODUCT_TABS.reviews);
		requestAnimationFrame(() =>
			document.getElementById("product-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" }),
		);
	}, []);

	if (loading && !product) return <ProductDetailSkeleton />;

	if (error) {
		if (error.response?.status === 404) return <ProductNotFound />;
		return (
			<ErrorState
				error={error}
				subject="این محصول"
				homeTo="/products"
				homeLabel="همه محصولات"
				onRetry={reload}
			/>
		);
	}

	if (!product || String(product.id) !== String(id)) return <ProductDetailSkeleton />;

	const categoryId = CATEGORIES.find((category) => category.name === product.cat)?.id;

	return (
		<motion.div
			variants={stagger(0.08)}
			initial="hidden"
			animate="show"
			className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 pb-28 lg:pb-10"
		>
			<motion.div variants={fadeUp}>
				<ProductBreadcrumb categoryId={categoryId} productName={product.name} />
			</motion.div>

			<motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-8 lg:gap-14 mb-14 lg:mb-20 items-start">
				<div className="lg:sticky lg:top-28">
					<ProductGallery product={product} />
				</div>

				<div>
					<ProductInfo product={product} onShowReviews={showReviews} />
					<PurchasePanel key={product.id} product={product} onAdd={addToCart} />
					<ProductPerks />
				</div>
			</motion.div>

			<motion.section variants={fadeUp} id="product-tabs" className="scroll-mt-28 mb-14 lg:mb-20">
				<ProductTabs active={tab} onChange={setTab} reviewCount={product.ratingCount} />

				{tab === PRODUCT_TABS.description && (
					<div className="bg-white border border-ink/10 rounded-3xl p-6 sm:p-8">
						<h2 className="text-xl font-extrabold text-forest mb-4">درباره این محصول</h2>
						<p className="leading-9 text-ink/70">{product.longDesc || product.desc}</p>
					</div>
				)}
				{tab === PRODUCT_TABS.specs && <ProductSpecs product={product} />}
				{tab === PRODUCT_TABS.reviews && <ProductComments product={product} onProductChange={handleProductChange} />}
			</motion.section>

			<RelatedProductsSlider product={product} categoryId={categoryId} onAdd={addToCart} />

			<MobilePurchaseBar product={product} targetId={PURCHASE_PANEL_ID} />
		</motion.div>
	);
}
