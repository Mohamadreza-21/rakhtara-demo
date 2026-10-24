import { memo } from "react";
import { ImageOff } from "lucide-react";
import StockPill from "../../cms/ui/StockPill";

function ProductGallery({ product }) {
	const hasStock = typeof product.stock === "number";

	return (
		<div className="relative">
			<div
				aria-hidden="true"
				className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-camel/25 via-transparent to-forest/10"
			/>
			<div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden shadow-2xl shadow-forest/10 bg-gradient-to-br from-cream-dark to-camel-light/40 flex items-center justify-center">
				{product.image ? (
					<img
						src={product.image}
						alt={product.name}
						decoding="async"
						fetchPriority="high"
						className="w-full h-full object-cover"
					/>
				) : (
					<ImageOff className="text-cream/70" size={64} />
				)}
				{hasStock && (
					<span className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full shadow-sm">
						<StockPill stock={product.stock} />
					</span>
				)}
			</div>
		</div>
	);
}

export default memo(ProductGallery);
