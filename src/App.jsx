import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/routes.jsx";
import { preloadPagesWhenIdle } from "./lib/lazyPages";
import { useAuth } from "./context/useAuth";
import { canAccessPanel } from "./lib/roles";

export default function App() {
	const { user } = useAuth();
	const canOpenPanel = canAccessPanel(user);

	useEffect(() => {
		preloadPagesWhenIdle({ cms: canOpenPanel });
	}, [canOpenPanel]);

	return <RouterProvider router={router} />;
}
