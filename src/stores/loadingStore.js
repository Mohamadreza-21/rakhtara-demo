import { create } from "zustand";

export const useLoadingStore = create((set) => ({
	count: 0,
	start: () => set((state) => ({ count: state.count + 1 })),
	stop: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
}));

export const selectIsLoading = (state) => state.count > 0;
