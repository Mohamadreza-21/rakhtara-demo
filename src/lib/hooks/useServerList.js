import { useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usePageParam } from "./useUrlPage";

const NO_ITEMS = [];

export function useServerList({ queryKey, fetcher, params, pageSize, pageKey = "page" }) {
	const [page, setPage] = usePageParam(pageKey);
	const request = { ...params, page, perPage: pageSize };

	const query = useQuery({
		queryKey: [...queryKey, request],
		queryFn: () => fetcher(request),
		placeholderData: keepPreviousData,
	});

	const { data, refetch } = query;
	const pages = data?.pages ?? 1;

	useEffect(() => {
		if (data && page > pages) setPage(pages, { replace: true });
	}, [data, page, pages, setPage]);

	return {
		items: data?.items ?? NO_ITEMS,
		total: data?.total ?? 0,
		pages,
		page: Math.min(page, pages),
		setPage,
		error: data ? null : query.error,
		reload: refetch,
		initialLoading: query.isPending,
		fetching: query.isPlaceholderData,
	};
}
