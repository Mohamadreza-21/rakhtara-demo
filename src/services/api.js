import axios from "axios";
import { mockAdapter } from "../mock/adapter";
import { notifyError } from "../lib/errorToast";
import { ERROR_TYPES, getErrorType } from "../lib/errors";

const api = axios.create({
	adapter: mockAdapter,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const isRead = error.config?.method === "get";
		if (isRead && getErrorType(error) !== ERROR_TYPES.NOT_FOUND) notifyError(error);
		return Promise.reject(error);
	},
);

export default api;
