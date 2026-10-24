import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function usePageParam(key = "page") {
	const [searchParams, setSearchParams] = useSearchParams();

	const parsed = Number.parseInt(searchParams.get(key) ?? "1", 10);
	const page = Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;

	const setPage = useCallback(
		(nextPage, { replace = false } = {}) => {
			setSearchParams(
				(previous) => {
					const next = new URLSearchParams(previous);
					if (nextPage <= 1) next.delete(key);
					else next.set(key, String(nextPage));
					return next;
				},
				{ replace, preventScrollReset: true },
			);
		},
		[key, setSearchParams],
	);

	return [page, setPage];
}

export function useUrlParam(key, defaultValue, { pageKey = "page" } = {}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const value = searchParams.get(key) ?? defaultValue;

	const setValue = useCallback(
		(nextValue) => {
			setSearchParams(
				(previous) => {
					const next = new URLSearchParams(previous);
					if (nextValue === defaultValue || nextValue == null || nextValue === "") next.delete(key);
					else next.set(key, nextValue);
					next.delete(pageKey);
					return next;
				},
				{ replace: true, preventScrollReset: true },
			);
		},
		[key, defaultValue, pageKey, setSearchParams],
	);

	return [value, setValue];
}
