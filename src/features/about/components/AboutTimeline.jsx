import { TIMELINE } from "../../../lib/data/about";

export default function AboutTimeline() {
	return (
		<section className="bg-forest">
			<div className="max-w-7xl mx-auto px-6 py-24">
				<div className="max-w-2xl mb-16">
					<p className="text-camel text-sm tracking-[0.3em] font-semibold mb-4">
						مسیر رخت‌آرا
					</p>
					<h2 className="text-3xl md:text-4xl font-extrabold text-cream leading-relaxed">
						از یک کارگاه کوچک تا فروشگاهی برای سراسر ایران
					</h2>
				</div>

				<div className="grid md:grid-cols-3 gap-10">
					{TIMELINE.map((timelineItem, index) => (
						<div key={timelineItem.year} className="relative">
							<div className="flex items-center gap-3 mb-4">
								<span className="w-10 h-10 rounded-full bg-camel text-forest font-extrabold flex items-center justify-center text-sm">
									{index + 1}
								</span>
								<span className="text-camel font-extrabold text-lg">
									{timelineItem.year}
								</span>
							</div>
							<h3 className="text-cream font-bold mb-2">{timelineItem.title}</h3>
							<p className="text-cream/70 text-sm leading-7">{timelineItem.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
