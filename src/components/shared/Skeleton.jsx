const TONES = {
	site: "bg-ink/[0.07] [--sk-shine:rgba(255,255,255,0.7)]",
	cms: "bg-[#E8EBF2] [--sk-shine:rgba(255,255,255,0.8)]",
	dark: "bg-cream/15 [--sk-shine:rgba(255,255,255,0.14)]",
};

export function Skeleton({ className = "", tone = "site", delay = 0, style }) {
	return (
		<div
			aria-hidden="true"
			className={`skeleton ${TONES[tone] || TONES.site} ${className || "h-4 w-full rounded"}`}
			style={delay ? { ...style, "--sk-delay": `${delay}s` } : style}
		/>
	);
}

export function SkeletonText({ lines = 3, tone = "site", className = "" }) {
	return (
		<div className={`space-y-2.5 ${className}`}>
			{Array.from({ length: lines }).map((_, index) => (
				<Skeleton
					key={index}
					tone={tone}
					delay={index * 0.08}
					className={`h-3.5 rounded ${index === lines - 1 && lines > 1 ? "w-2/3" : "w-full"}`}
				/>
			))}
		</div>
	);
}

export function SkeletonGroup({
	children,
	label = "در حال بارگذاری...",
	className = "",
}) {
	return (
		<div role="status" aria-busy="true" aria-live="polite" className={`skeleton-group ${className}`}>
			<span className="sr-only">{label}</span>
			{children}
		</div>
	);
}
