import { memo, useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { toman } from "../../../lib/data/products";

function MobilePurchaseBar({ product, targetId }) {
	const [panelVisible, setPanelVisible] = useState(true);

	useEffect(() => {
		const target = document.getElementById(targetId);
		if (!target) return;
		const observer = new IntersectionObserver(([entry]) => setPanelVisible(entry.isIntersecting), {
			threshold: 0.1,
		});
		observer.observe(target);
		return () => observer.disconnect();
	}, [targetId, product.id]);

	if (panelVisible) return null;

	return (
		<div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-cream/95 backdrop-blur border-t border-camel/30 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
			<div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
				<div className="min-w-0">
					<p className="text-xs text-ink/50 truncate">{product.name}</p>
					<p className="font-extrabold text-forest">{toman(product.price)}</p>
				</div>
				<button
					type="button"
					onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "center" })}
					className="cursor-pointer shrink-0 flex items-center gap-2 bg-forest text-cream font-bold px-6 py-3 rounded-full active:scale-95 transition-transform"
				>
					<ShoppingBag size={18} />
					خرید
				</button>
			</div>
		</div>
	);
}

export default memo(MobilePurchaseBar);
