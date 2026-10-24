import { Search, X } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder, className = "" }) {
	return (
		<div className={`relative ${className}`}>
			<Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
			<input
				type="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				aria-label={placeholder}
				className="w-full bg-white border border-ink/10 rounded-full pr-11 pl-10 py-2.5 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-camel/40 transition [&::-webkit-search-cancel-button]:appearance-none"
			/>
			{value && (
				<button
					type="button"
					onClick={() => onChange("")}
					aria-label="پاک کردن جستجو"
					className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
				>
					<X size={16} />
				</button>
			)}
		</div>
	);
}
