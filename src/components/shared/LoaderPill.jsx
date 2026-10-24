export default function LoaderPill({ label = "در حال دریافت...", icon: Icon, className = "" }) {
	return (
		<div
			role="status"
			className={`loader-enter inline-flex items-center gap-3 bg-white/95 border border-camel/30 shadow-xl shadow-forest/10 rounded-full pl-5 pr-4 py-3 ${className}`}
		>
			<span className="relative flex h-8 w-8 items-center justify-center">
				<span
					aria-hidden="true"
					className="absolute inset-0 rounded-full border-[3px] border-forest/15 border-t-camel border-r-forest/60 animate-spin"
				/>
				{Icon && <Icon size={14} aria-hidden="true" className="text-forest" />}
			</span>
			<span className="text-sm font-bold text-forest">{label}</span>
		</div>
	);
}
