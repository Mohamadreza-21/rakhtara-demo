import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, footer }) {
	useEffect(() => {
		if (!open) return;
		const handleKeyDown = (event) => {
			if (event.key === "Escape") onClose?.();
		};
		document.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [open, onClose]);

	return createPortal(
		<AnimatePresence>
		{open && (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<motion.div
				className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				onClick={onClose}
			/>

			<motion.div
				className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl shadow-black/10 border border-[#EEF0F5]"
				initial={{ opacity: 0, y: 24, scale: 0.96 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: 12, scale: 0.97 }}
				transition={{ type: "spring", damping: 28, stiffness: 340 }}
			>
				<div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF0F5]">
					<h2 id="modal-title" className="font-bold text-lg text-[#111827]">
						{title}
					</h2>
					<button
						onClick={onClose}
						className="cursor-pointer text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F5F6FA] p-1.5 rounded-lg transition"
						aria-label="بستن"
					>
						<X size={18} />
					</button>
				</div>

				<div className="px-6 py-5 max-h-[70vh] overflow-y-auto">{children}</div>

				{footer && (
					<div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#EEF0F5]">
						{footer}
					</div>
				)}
			</motion.div>
		</div>
		)}
		</AnimatePresence>,
		document.body,
	);
}
