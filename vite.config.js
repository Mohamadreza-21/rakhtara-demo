import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	base: process.env.VITE_BASE_PATH || "/rakhtara-demo/",
	plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (!id.includes("node_modules")) return;
					if (/recharts|d3-|victory-vendor/.test(id)) return "charts";
					if (/framer-motion|motion-dom|motion-utils/.test(id)) return "motion";
					if (/swiper/.test(id)) return "swiper";
					if (/react-router/.test(id)) return "router";
					if (/react-hook-form|@hookform|zod/.test(id)) return "forms";
					if (/@tanstack|axios/.test(id)) return "data";
				},
			},
		},
	},
});
