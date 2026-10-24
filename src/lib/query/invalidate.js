import { queryClient } from "./queryClient";
import { keys } from "./keys";

const invalidate = (...queryKeys) =>
	Promise.all(queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey })));

export const invalidateProducts = () => invalidate(keys.products.all, keys.stats.all);
export const invalidateUsers = () => invalidate(keys.users.all, keys.stats.all);
export const invalidateComments = () => invalidate(keys.comments.all, keys.products.all, keys.stats.all);
export const invalidateMessages = () => invalidate(keys.messages.all);
