import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CATEGORIES } from "../lib/data/products";

const VALID_CATEGORIES = ["همه", ...CATEGORIES.map((category) => category.name)];

export const useCmsProductsFilterStore = create(
	persist(
		(set) => ({
			query: "",
			category: "همه",
			view: "grid",
			setQuery: (query) => set({ query }),
			setCategory: (category) => set({ category }),
			setView: (view) => set({ view }),
		}),
		{
			name: "nemonekar-cms-products-filter",
			partialize: ({ query, category, view }) => ({ query, category, view }),
			merge: (persisted, current) => {
				const saved = persisted ?? {};
				return {
					...current,
					query: typeof saved.query === "string" ? saved.query : current.query,
					category: VALID_CATEGORIES.includes(saved.category) ? saved.category : current.category,
					view: saved.view === "grid" || saved.view === "table" ? saved.view : current.view,
				};
			},
		},
	),
);
