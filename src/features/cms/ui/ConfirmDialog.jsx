import { Loader2 } from "lucide-react";
import Modal from "./Modal";

const TONES = {
	danger: "bg-[#DC2626] hover:bg-[#B91C1C] shadow-[#DC2626]/20",
	primary: "bg-[#6C63FF] hover:bg-[#4F46E5] shadow-[#6C63FF]/20",
};

export default function ConfirmDialog({
	open,
	onClose,
	onConfirm,
	title = "تایید حذف",
	description,
	confirmLabel = "حذف",
	cancelLabel = "انصراف",
	loadingLabel = "در حال حذف...",
	tone = "danger",
	loading = false,
}) {
	const handleClose = () => {
		if (loading) return;
		onClose?.();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			title={title}
			footer={
				<>
					<button
						type="button"
						onClick={handleClose}
						disabled={loading}
						className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-[#F5F6FA] transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{cancelLabel}
					</button>
					<button
						type="button"
						onClick={onConfirm}
						disabled={loading}
						className={`cursor-pointer flex items-center gap-1.5 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed ${TONES[tone]}`}
					>
						{loading && <Loader2 size={15} className="animate-spin" />}
						{loading ? loadingLabel : confirmLabel}
					</button>
				</>
			}
		>
			<p className="text-sm text-[#6B7280] leading-6">{description}</p>
		</Modal>
	);
}
