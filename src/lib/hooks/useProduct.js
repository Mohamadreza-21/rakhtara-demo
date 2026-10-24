import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct } from "../../services/products";
import { keys } from "../query/keys";
import { findCachedProduct } from "../query/productCache";

export function useProduct(id) {
	const queryClient = useQueryClient();

	return useQuery({
		queryKey: keys.products.detail(id),
		queryFn: () => getProduct(id),
		initialData: () => findCachedProduct(queryClient, id)?.product,
		initialDataUpdatedAt: () => findCachedProduct(queryClient, id)?.updatedAt,
	});
}
