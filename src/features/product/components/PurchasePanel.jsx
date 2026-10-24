import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useCartStore } from "../../../stores/cartStore";
import QuantityStepper from "./QuantityStepper";
import SizeSelector from "./SizeSelector";
import { PURCHASE_PANEL_ID } from "./constants";

const UNLIMITED_MAX = 99;

export default function PurchasePanel({ product, onAdd }) {
	const sizes = Array.isArray(product.sizes) ? product.sizes : [];
	const hasSizes = sizes.length > 0;
	const hasStock = typeof product.stock === "number";

	const [qty, setQty] = useState(1);
	const [size, setSize] = useState(hasSizes ? sizes[0] : null);
	const [justAdded, setJustAdded] = useState(false);
	const timerRef = useRef(null);

	useEffect(() => () => clearTimeout(timerRef.current), []);

	const cartKey = size ? `${product.id}-${size}` : `${product.id}`;
	const inCart = useCartStore((state) => state.items.find((item) => item.cartKey === cartKey)?.qty ?? 0);

	const remaining = hasStock ? Math.max(0, product.stock - inCart) : UNLIMITED_MAX;
	const soldOut = hasStock && product.stock === 0;
	const maxedOut = !soldOut && remaining === 0;
	const effectiveQty = Math.max(1, Math.min(qty, remaining));

	const handleAdd = async () => {
		if (remaining === 0) return;
		const added = await onAdd(product, effectiveQty, size);
		if (!added) return;
		setQty(1);
		setJustAdded(true);
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => setJustAdded(false), 1200);
	};

	return (
		<div id={PURCHASE_PANEL_ID} className="bg-white border border-camel/30 shadow-xl shadow-forest/5 rounded-3xl p-6 mb-6 scroll-mt-28">
			{hasSizes && <SizeSelector sizes={sizes} value={size} onChange={setSize} />}

			<div className="flex items-center gap-4">
				<QuantityStepper
					value={effectiveQty}
					max={remaining}
					onChange={(next) => setQty(Math.max(1, Math.min(next, remaining)))}
					disabled={remaining === 0}
				/>
				<button
					type="button"
					onClick={handleAdd}
					disabled={remaining === 0}
					className={`cursor-pointer flex-1 font-bold py-3 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
						justAdded ? "bg-camel text-forest" : "bg-forest text-cream"
					}`}
				>
					{soldOut ? (
						"ناموجود"
					) : maxedOut ? (
						"به سقف موجودی رسیده‌اید"
					) : justAdded ? (
						<>
							<Check size={18} />
							به سبد اضافه شد
						</>
					) : (
						"افزودن به سبد خرید"
					)}
				</button>
			</div>

			{hasStock && !soldOut && (
				<p className="text-xs text-ink/50 mt-4">
					{inCart > 0
						? `${inCart.toLocaleString("fa-IR")} عدد از این محصول در سبد شماست`
						: `موجودی انبار: ${product.stock.toLocaleString("fa-IR")} عدد`}
				</p>
			)}
		</div>
	);
}
