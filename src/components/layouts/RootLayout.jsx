import { Outlet } from "react-router-dom";
import ScrollManager from "../shared/ScrollManager";
import SkipLink from "../shared/SkipLink";
import OfflineBanner from "../shared/OfflineBanner";

export default function RootLayout() {
	return (
		<>
			<SkipLink />
			<ScrollManager />
			<Outlet />
			<OfflineBanner />
		</>
	);
}
