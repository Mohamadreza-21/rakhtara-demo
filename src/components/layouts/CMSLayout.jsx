import { useState } from "react";
import AppToaster from "../shared/AppToaster";
import Topbar from "../../features/cms/common/Topbar";
import Sidebar from "../../features/cms/common/Sidebar";
import RouteTransition from "../shared/RouteTransition";

function CMSLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div
			dir="rtl"
			style={{ fontFamily: "'Vazirmatn', sans-serif" }}
			className="min-h-screen w-full flex"
		>
			<style>{`.tabular-nums { font-variant-numeric: tabular-nums; }`}</style>

			<AppToaster />

			<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

			<div
				className="flex-1 min-w-0 flex flex-col"
				style={{
					background: "linear-gradient(180deg, #F7F8FC 0%, #EFF2FB 100%)",
				}}
			>
				<Topbar onMenuClick={() => setSidebarOpen(true)} />
				<main id="main-content" tabIndex={-1} className="outline-none flex-1 min-w-0 px-4 sm:px-6 lg:px-8 pb-8">
					<RouteTransition variant="cms" />
				</main>
			</div>
		</div>
	);
}

export default CMSLayout;
