import { memo } from "react";

function SizeSelector({ sizes, value, onChange }) {
	return (
		<div className="mb-6">
			<p className="text-sm font-bold mb-3 text-ink/70">انتخاب سایز</p>
			<div className="flex flex-wrap gap-2">
				{sizes.map((sizeOption) => (
					<button
						type="button"
						key={sizeOption}
						onClick={() => onChange(sizeOption)}
						aria-pressed={value === sizeOption}
						className={`cursor-pointer w-11 h-11 rounded-full border flex items-center justify-center text-sm font-bold transition-colors ${
							value === sizeOption
								? "bg-forest text-cream border-forest"
								: "bg-white border-ink/20 text-ink/70 hover:border-forest/40"
						}`}
					>
						{sizeOption}
					</button>
				))}
			</div>
		</div>
	);
}

export default memo(SizeSelector);
