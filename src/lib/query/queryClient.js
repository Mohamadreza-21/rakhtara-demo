import { QueryClient } from "@tanstack/react-query";

const STALE_TIME = 60 * 1000;
const GC_TIME = 10 * 60 * 1000;

function shouldRetry(failureCount, error) {
	const status = error?.response?.status;
	if (status && status >= 400 && status < 500) return false;
	return failureCount < 1;
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: STALE_TIME,
			gcTime: GC_TIME,
			retry: shouldRetry,
			refetchOnWindowFocus: false,
		},
	},
});
