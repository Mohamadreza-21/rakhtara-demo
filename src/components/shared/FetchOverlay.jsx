import LoaderPill from "./LoaderPill";

export default function FetchOverlay({ active, children, className = "" }) {
	return (
		<div className="relative" aria-busy={active}>
			<div className={`transition-opacity duration-200 ${active ? "opacity-40 pointer-events-none" : ""} ${className}`}>
				{children}
			</div>
			{active && (
				<div className="absolute inset-0 z-10 flex items-start justify-center pt-24">
					<LoaderPill />
				</div>
			)}
		</div>
	);
}
