import { memo } from "react";
import { Hash, Star } from "lucide-react";
import { toman } from "../../../lib/data/products";

function ProductInfo({ product, onShowReviews }) {
	const hasRating = product.ratingCount > 0;

	return (
		<div>
			<div className="flex flex-wrap items-center gap-2 mb-4">
				<span className="inline-block text-xs font-bold text-forest bg-camel/20 px-3 py-1 rounded-full">
					{product.cat}
				</span>
				{product.sku && (
					<span className="inline-flex items-center gap-1 text-xs font-medium text-ink/40">
						<Hash size={12} />
						{product.sku}
					</span>
				)}
			</div>

			<h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-forest mb-4">{product.name}</h1>

			<button
				type="button"
				onClick={onShowReviews}
				className="cursor-pointer inline-flex items-center gap-2 mb-5 text-sm text-ink/60 hover:text-forest transition-colors"
			>
				<span className="inline-flex items-center gap-1 bg-camel/15 text-forest font-bold px-2.5 py-1 rounded-full">
					<Star size={14} className="text-camel" fill="#D4A94E" />
					{hasRating ? product.rating.toLocaleString("fa-IR", { maximumFractionDigits: 1 }) : "—"}
				</span>
				{hasRating ? `${product.ratingCount.toLocaleString("fa-IR")} نظر` : "هنوز نظری ثبت نشده"}
			</button>

			<p className="text-lg leading-8 text-ink/70 mb-6">{product.desc}</p>

			<div className="flex items-baseline gap-2 mb-8">
				<span className="text-4xl font-extrabold text-forest">{toman(product.price)}</span>
			</div>
		</div>
	);
}

export default memo(ProductInfo);
