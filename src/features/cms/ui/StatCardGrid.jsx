import StatCard from "./StatCard";

export default function StatCardGrid({ items }) {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
			{items.map((item) => (
				<StatCard key={item.label} {...item} />
			))}
		</div>
	);
}
