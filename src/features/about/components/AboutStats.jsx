import { STATS } from "../../../lib/data/about";

export default function AboutStats() {
	return (
		<section className="border-y border-ink/10 bg-white">
			<div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
				{STATS.map((stat) => (
					<div key={stat.label}>
						<p className="text-2xl md:text-3xl font-extrabold text-forest mb-1">
							{stat.value}
						</p>
						<p className="text-sm text-ink/50">{stat.label}</p>
					</div>
				))}
			</div>
		</section>
	);
}
