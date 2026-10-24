import { useMemo } from "react";
import { getProductsPage } from "../../services/products";
import { SORT_VALUES } from "../productSort";
import { keys } from "../query/keys";
import { useServerList } from "./useServerList";
import { useUrlParam } from "./useUrlPage";
import { useUrlSearch } from "./useUrlSearch";

const PAGE_SIZE = 12;

export function useProductListing({ category }) {
	const search = useUrlSearch();
	const [rawSort, setSort] = useUrlParam("sort", "default");
	const sort = SORT_VALUES.includes(rawSort) ? rawSort : "default";

	const params = useMemo(
		() => ({ category, search: search.query, sort }),
		[category, search.query, sort],
	);

	const list = useServerList({
		queryKey: keys.products.list,
		fetcher: getProductsPage,
		params,
		pageSize: PAGE_SIZE,
	});

	return { ...list, search, sort, setSort, pageSize: PAGE_SIZE, hasFilters: Boolean(search.query) };
}
