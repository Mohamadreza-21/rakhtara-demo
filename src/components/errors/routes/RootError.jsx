import RouteErrorView from "../RouteErrorView";
import SiteNotFound from "../notfound/SiteNotFound";

export default function RootError() {
	return (
		<RouteErrorView
			subject="برنامه"
			fullScreen
			notFound={
				<div dir="rtl" className="min-h-screen bg-cream font-vazir flex items-center">
					<div className="w-full">
						<SiteNotFound />
					</div>
				</div>
			}
		/>
	);
}
