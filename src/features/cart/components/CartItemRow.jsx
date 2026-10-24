import { memo } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Trash2, ImageOff } from "lucide-react";
import { toman } from "../../../lib/data/products";

function CartItemRow({ item, stock, onChangeQty, onRemove }) {
	const atLimit = typeof stock === "number" && item.qty >= stock;

	return (
		<motion.div
			layout="position"
			initial={{ opacity: 0, x: -16 }}
			animate={{ opacity: 1, x: 0 }}
			className="flex items-center gap-3 bg-white rounded-2xl p-3 border border-ink/10"
		>
			<div
				className={`w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center shrink-0 bg-gradient-to-br ${item.gradient || "from-cream-dark to-camel-light/40"}`}
			>
				{item.image ? (
					<img
						src={item.image}
						alt={item.name}
						loading="lazy"
						decoding="async"
						className="w-full h-full object-cover"
					/>
				) : (
					<ImageOff size={18} className="text-cream/70" />
				)}
			</div>
			<div className="flex-1 min-w-0">
				<p className="font-bold text-sm truncate text-forest">
					{item.name}
					{item.size ? ` (سایز ${item.size})` : ""}
				</p>
				<p className="text-xs text-ink/50">{toman(item.price)}</p>
				{atLimit && <p className="text-[11px] text-rust mt-0.5">حداکثر موجودی</p>}
			</div>
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => onChangeQty(item.cartKey, -1)}
					aria-label="کاهش تعداد"
					className="cursor-pointer w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center"
				>
					<Minus size={12} />
				</button>
				<span className="text-sm w-4 text-center">{item.qty.toLocaleString("fa-IR")}</span>
				<button
					type="button"
					onClick={() => onChangeQty(item.cartKey, 1)}
					disabled={atLimit}
					aria-label="افزایش تعداد"
					className="cursor-pointer w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
				>
					<Plus size={12} />
				</button>
			</div>
			<button
				type="button"
				onClick={() => onRemove(item.cartKey)}
				aria-label="حذف"
				className="cursor-pointer p-1 text-rust"
			>
				<Trash2 size={16} />
			</button>
		</motion.div>
	);
}

export default memo(CartItemRow);
