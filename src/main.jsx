import { StrictMode } from "react";
import { MotionConfig } from "framer-motion";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query/queryClient";
import AuthProvider from "./context/AuthProvider";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<MotionConfig reducedMotion="user">
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<App />
				</AuthProvider>
			</QueryClientProvider>
		</MotionConfig>
	</StrictMode>,
);
