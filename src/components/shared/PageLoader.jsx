function BrandMark() {
	return (
		<div className="relative flex items-center justify-center w-24 h-24">
			<span aria-hidden="true" className="loader-pulse absolute inset-0 rounded-full bg-camel/25" />
			<span
				aria-hidden="true"
				className="absolute inset-1 rounded-full border-[3px] border-forest/10 border-t-camel border-r-forest/60 animate-spin [animation-duration:1.1s]"
			/>
			<span className="relative w-14 h-14 rounded-full bg-gradient-to-br from-forest to-forest-dark text-camel flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-forest/25">
				ر
			</span>
		</div>
	);
}

export default function PageLoader({
	label = "در حال بارگذاری",
	fullScreen = false,
	className = "",
}) {
	return (
		<div
			role="status"
			aria-live="polite"
			dir="rtl"
			className={`loader-enter flex flex-col items-center justify-center gap-6 text-ink/60 font-vazir ${
				fullScreen ? "min-h-screen bg-cream" : "min-h-[50vh]"
			} ${className}`}
		>
			<BrandMark />
			<div className="flex flex-col items-center gap-3">
				<p className="text-sm font-semibold flex items-center gap-2">
					{label}
					<span className="inline-flex gap-1" aria-hidden="true">
						{[0, 1, 2].map((index) => (
							<span
								key={index}
								className="loader-dot w-1.5 h-1.5 rounded-full bg-camel"
								style={{ animationDelay: `${index * 0.15}s` }}
							/>
						))}
					</span>
				</p>
				<span aria-hidden="true" className="loader-bar block w-32 h-1 rounded-full bg-forest/10 overflow-hidden">
					<span className="loader-bar-fill block h-full w-1/2 rounded-full bg-gradient-to-l from-camel to-forest" />
				</span>
			</div>
		</div>
	);
}
