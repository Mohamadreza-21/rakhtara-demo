import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import AboutHero from "../features/about/components/AboutHero";
import AboutStats from "../features/about/components/AboutStats";
import AboutValues from "../features/about/components/AboutValues";
import AboutTimeline from "../features/about/components/AboutTimeline";
import AboutTeam from "../features/about/components/AboutTeam";
import AboutCta from "../features/about/components/AboutCta";

export default function AboutUSPage() {
	return (
		<div>
			<div className="max-w-7xl mx-auto px-6 pt-10">
				<div className="flex items-center gap-2 text-sm mb-8 text-ink/50">
					<Link to="/" className="hover:underline text-forest">
						خانه
					</Link>
					<ChevronLeft size={14} />
					<span>درباره ما</span>
				</div>
			</div>

			<AboutHero />
			<AboutStats />
			<AboutValues />
			<AboutTimeline />
			<AboutTeam />
			<AboutCta />
		</div>
	);
}
