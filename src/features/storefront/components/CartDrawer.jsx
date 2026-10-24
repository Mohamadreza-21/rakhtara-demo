import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { X } from "lucide-react";
import { toman } from "../../../lib/data/products";
import Pagination from "./Pagination";
import CartItemRow from "../../cart/components/CartItemRow";

const PAGE_SIZE = 12;

function CartDrawer({ cart, cartTotal, onClose, changeQty, removeItem }) {
	const [page, setPage] = useState(1);
	const totalPages = Math.max(1, Math.ceil(cart.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);
	const visibleItems = cart.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	useEffect(() => {
		const onKeyDown = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKeyDown);
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [onClose]);

	return (
		<motion.div
			className="fixed inset-0 z-[60] flex justify-end bg-black/40"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.25 }}
			onClick={onClose}
		>
			<motion.div
				role="dialog"
				aria-modal="true"
				aria-label="سبد خرید"
				className="w-full max-w-sm h-full flex flex-col bg-cream"
				initial={{ x: "-100%" }}
				animate={{ x: 0 }}
				exit={{ x: "-100%" }}
				transition={{ type: "spring", damping: 32, stiffness: 320 }}
				onClick={(event) => event.stopPropagation()}
			>
				<div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
					<h3 className="font-extrabold text-lg text-forest">سبد خرید</h3>
					<button
						type="button"
						onClick={onClose}
						aria-label="بستن"
						className="cursor-pointer p-1 rounded-full hover:bg-black/5"
					>
						<X size={20} />
					</button>
				</div>
				<div className="flex-1 overflow-y-auto px-6 py-4">
					{cart.length === 0 ? (
						<p className="text-center mt-10 text-ink/50">سبد خرید شما خالی است</p>
					) : (
						<div className="space-y-4">
							{visibleItems.map((item) => (
								<CartItemRow
									key={item.cartKey}
									item={item}
									stock={item.stock}
									onChangeQty={changeQty}
									onRemove={removeItem}
								/>
							))}
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={setPage}
								className="pt-2"
							/>
						</div>
					)}
				</div>
				{cart.length > 0 && (
					<div className="px-6 py-5 border-t border-ink/10">
						<div className="flex items-center justify-between mb-4">
							<span className="text-sm text-ink/60">جمع کل</span>
							<span className="font-extrabold text-lg text-forest">{toman(cartTotal)}</span>
						</div>
						<button
							type="button"
							onClick={() => toast.info("فرایند تسویه حساب به‌زودی راه‌اندازی می‌شود")}
							className="cursor-pointer w-full font-bold py-3 rounded-full bg-camel hover:bg-camel-light text-forest transition-colors glow-camel"
						>
							ادامه فرایند خرید
						</button>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
}

export default memo(CartDrawer);
