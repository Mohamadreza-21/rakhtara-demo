import { isRouteErrorResponse } from "react-router-dom";

export const ERROR_TYPES = {
	NETWORK: "network",
	TIMEOUT: "timeout",
	SERVER: "server",
	UNAUTHORIZED: "unauthorized",
	FORBIDDEN: "forbidden",
	NOT_FOUND: "notfound",
	RATE_LIMIT: "ratelimit",
	CHUNK: "chunk",
	RENDER: "render",
	UNKNOWN: "unknown",
};

const CHUNK_PATTERN =
	/Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading chunk/i;

export function getErrorType(error) {
	if (!error) return ERROR_TYPES.UNKNOWN;

	if (isRouteErrorResponse(error)) {
		return typeFromStatus(error.status);
	}

	if (CHUNK_PATTERN.test(error.message || "")) return ERROR_TYPES.CHUNK;

	if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
		return ERROR_TYPES.TIMEOUT;
	}

	if (error.isAxiosError || error.request || error.code === "ERR_NETWORK") {
		if (!error.response) return ERROR_TYPES.NETWORK;
		return typeFromStatus(error.response.status);
	}

	if (error instanceof Error) return ERROR_TYPES.RENDER;

	return ERROR_TYPES.UNKNOWN;
}

function typeFromStatus(status) {
	if (status === 401) return ERROR_TYPES.UNAUTHORIZED;
	if (status === 403) return ERROR_TYPES.FORBIDDEN;
	if (status === 404) return ERROR_TYPES.NOT_FOUND;
	if (status === 408) return ERROR_TYPES.TIMEOUT;
	if (status === 429) return ERROR_TYPES.RATE_LIMIT;
	if (status >= 500) return ERROR_TYPES.SERVER;
	return ERROR_TYPES.UNKNOWN;
}
