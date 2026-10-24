import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, LogOut, Pencil, Trash2 } from "lucide-react";

const ICONS = { logout: LogOut, edit: Pencil, danger: Trash2 };

export default function SiteConfirmDialog({
	open,
	onClose,
	onConfirm,
	title,
	description,
	confirmLabel = "تایید",
	cancelLabel = "انصراف",
	loadingLabel = "لطفاً صبر کنید...",
	icon = "edit",
	tone = "primary",
	loading = false,
}) {
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (event) => {
			if (event.key === "Escape" && !loading) onClose?.();
		};
		document.addEventListener("keydown", onKeyDown);
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [open, loading, onClose]);

	const Icon = ICONS[icon] ?? Pencil;
	const danger = tone === "danger";

	return createPortal(
		<AnimatePresence>
			{open && (
				<div
					className="fixed inset-0 z-[70] flex items-center justify-center p-4"
					role="alertdialog"
					aria-modal="true"
					aria-labelledby="site-confirm-title"
					aria-describedby="site-confirm-description"
				>
					<motion.div
						className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={loading ? undefined : onClose}
					/>
					<motion.div
						className="relative w-full max-w-sm rounded-3xl bg-cream border border-camel/30 p-7 text-center shadow-2xl shadow-forest/20"
						initial={{ opacity: 0, y: 24, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 12, scale: 0.97 }}
						transition={{ type: "spring", damping: 28, stiffness: 340 }}
					>
						<span
							aria-hidden="true"
							className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${
								danger ? "bg-rust/15 text-rust" : "bg-camel/25 text-forest"
							}`}
						>
							<Icon size={24} />
						</span>
						<h2 id="site-confirm-title" className="mb-2 text-lg font-extrabold text-forest">
							{title}
						</h2>
						<p id="site-confirm-description" className="mb-7 text-sm leading-7 text-ink/60">
							{description}
						</p>
						<div className="grid grid-cols-2 gap-3">
							<button
								type="button"
								onClick={onClose}
								disabled={loading}
								className="cursor-pointer rounded-full border border-ink/15 bg-white py-3 text-sm font-bold text-ink/70 transition hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{cancelLabel}
							</button>
							<button
								type="button"
								onClick={onConfirm}
								disabled={loading}
								className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-full py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
									danger ? "bg-rust hover:bg-rust-light" : "bg-forest hover:bg-forest-light"
								}`}
							>
								{loading && <Loader2 size={15} className="animate-spin" />}
								{loading ? loadingLabel : confirmLabel}
							</button>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>,
		document.body,
	);
}
