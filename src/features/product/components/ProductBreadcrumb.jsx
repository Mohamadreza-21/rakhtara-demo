import { memo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

function ProductBreadcrumb({ categoryId, productName }) {
	return (
		<div className="flex items-center gap-2 text-sm mb-8 text-ink/50">
			<Link to="/" className="hover:underline text-forest">
				خانه
			</Link>
			<ChevronLeft size={14} />
			<Link
				to={categoryId ? `/products?category=${categoryId}` : "/products"}
				className="hover:underline text-forest"
			>
				محصولات
			</Link>
			<ChevronLeft size={14} />
			<span>{productName}</span>
		</div>
	);
}

export default memo(ProductBreadcrumb);
