import { memo } from "react";
import { Minus, Plus } from "lucide-react";

function QuantityStepper({ value, min = 1, max = Infinity, onChange, disabled = false }) {
	const canDecrease = !disabled && value > min;
	const canIncrease = !disabled && value < max;

	return (
		<div className="flex items-center gap-3 bg-white border border-ink/15 rounded-full px-4 py-2">
			<button
				type="button"
				onClick={() => onChange(value - 1)}
				disabled={!canDecrease}
				aria-label="کاهش تعداد"
				className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
			>
				<Minus size={16} />
			</button>
			<span className="w-6 text-center font-bold">{value.toLocaleString("fa-IR")}</span>
			<button
				type="button"
				onClick={() => onChange(value + 1)}
				disabled={!canIncrease}
				aria-label="افزایش تعداد"
				className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
			>
				<Plus size={16} />
			</button>
		</div>
	);
}

export default memo(QuantityStepper);
