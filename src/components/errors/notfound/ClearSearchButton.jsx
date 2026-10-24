export default function ClearSearchButton({ onClear, theme = "site" }) {
	const styles =
		theme === "cms"
			? "bg-[#16A34A] text-white hover:bg-[#15803D]"
			: "bg-forest text-cream hover:bg-forest-light";
	return (
		<button
			type="button"
			onClick={onClear}
			className={`cursor-pointer mb-4 text-sm font-bold px-6 py-3 rounded-full transition-colors ${styles}`}
		>
			پاک کردن جستجو
		</button>
	);
}
