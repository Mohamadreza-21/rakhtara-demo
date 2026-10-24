import { memo, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../lib/query/keys";
import { getRelatedProducts } from "../../../services/products";
import ProductCard from "../../storefront/components/ProductCard";
import ProductCardSkeleton from "../../storefront/components/ProductCardSkeleton";
import "swiper/css";
import "swiper/css/pagination";
import "./RelatedProductsSlider.css";

const RELATED_COUNT = 8;

const AUTOPLAY = { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true };

const BREAKPOINTS = {
	0: { slidesPerView: 1.1, spaceBetween: 16 },
	640: { slidesPerView: 2, spaceBetween: 20 },
	1024: { slidesPerView: 3, spaceBetween: 24 },
};

function RelatedProductsSlider({ product, categoryId, onAdd }) {
	const swiperRef = useRef(null);
	const { data: related, isPending: loading } = useQuery({
		queryKey: keys.products.related(product.id),
		queryFn: () => getRelatedProducts(product, RELATED_COUNT),
	});

	if (!loading && (!related || related.length === 0)) return null;

	return (
		<section aria-label="محصولات مرتبط">
			<div className="flex items-end justify-between mb-8 flex-wrap gap-3">
				<h2 className="text-2xl font-extrabold text-forest">محصولات مرتبط</h2>
				<div className="flex items-center gap-4">
					{categoryId && (
						<Link to={`/category/${categoryId}`} className="text-rust font-semibold hover:underline text-sm">
							مشاهده همه ←
						</Link>
					)}
					<div className="hidden sm:flex items-center gap-2">
						<button
							type="button"
							onClick={() => swiperRef.current?.slidePrev()}
							aria-label="محصول قبلی"
							className="cursor-pointer w-10 h-10 rounded-full border border-forest/20 text-forest flex items-center justify-center hover:bg-forest hover:text-cream transition-colors"
						>
							<ChevronRight size={18} />
						</button>
						<button
							type="button"
							onClick={() => swiperRef.current?.slideNext()}
							aria-label="محصول بعدی"
							className="cursor-pointer w-10 h-10 rounded-full border border-forest/20 text-forest flex items-center justify-center hover:bg-forest hover:text-cream transition-colors"
						>
							<ChevronLeft size={18} />
						</button>
					</div>
				</div>
			</div>

			{loading ? (
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="status" aria-busy="true">
					{Array.from({ length: 3 }).map((_, index) => (
						<ProductCardSkeleton key={index} delay={index * 0.08} />
					))}
				</div>
			) : (
				<Swiper
					key={product.id}
					modules={[Pagination, A11y, Autoplay]}
					dir="rtl"
					breakpoints={BREAKPOINTS}
					pagination={{ clickable: true }}
					grabCursor
					autoplay={AUTOPLAY}
					watchOverflow
					onSwiper={(swiper) => (swiperRef.current = swiper)}
					className="related-swiper"
				>
					{related.map((relatedProduct) => (
						<SwiperSlide key={relatedProduct.id} className="!h-auto">
							<ProductCard product={relatedProduct} onAdd={onAdd} />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</section>
	);
}

export default memo(RelatedProductsSlider);
