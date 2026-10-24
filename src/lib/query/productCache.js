import { keys } from "./keys";

function listOf(data) {
	if (Array.isArray(data)) return data;
	return Array.isArray(data?.items) ? data.items : null;
}

export function findCachedProduct(queryClient, id) {
	const target = String(id);

	for (const [queryKey, data] of queryClient.getQueriesData({ queryKey: keys.products.all })) {
		if (queryKey[1] === "detail") continue;
		const product = listOf(data)?.find((item) => String(item?.id) === target);
		if (product) {
			return { product, updatedAt: queryClient.getQueryState(queryKey)?.dataUpdatedAt };
		}
	}
	return null;
}
