import { AxiosError } from "axios";
import { handleRequest } from "./engine";

const LATENCY_MS = 180;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseBody(data) {
	if (typeof data !== "string" || data === "") return undefined;
	try {
		return JSON.parse(data);
	} catch {
		return undefined;
	}
}

export async function mockAdapter(config) {
	await wait(LATENCY_MS);

	const result = await handleRequest({
		method: (config.method || "get").toLowerCase(),
		path: String(config.url).split("?")[0],
		params: config.params,
		body: parseBody(config.data),
	});

	const response = {
		data: result.data,
		status: result.status,
		statusText: String(result.status),
		headers: {},
		config,
		request: {},
	};

	if (result.status >= 400) {
		throw new AxiosError(
			`Request failed with status code ${result.status}`,
			result.status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST,
			config,
			response.request,
			response,
		);
	}

	return response;
}
