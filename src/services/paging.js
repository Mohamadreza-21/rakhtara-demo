import api from "./api";

function isEmpty(value) {
	return value === undefined || value === null || value === "";
}

function toParams({ page, perPage, sort, filters = {}, contains = {} }) {
	const params = { _page: page, _per_page: perPage };
	if (sort) params._sort = sort;
	Object.entries(filters).forEach(([key, value]) => {
		if (!isEmpty(value)) params[key] = value;
	});
	Object.entries(contains).forEach(([key, value]) => {
		if (!isEmpty(value)) params[`${key}:contains`] = value;
	});
	return params;
}

export async function fetchPage(resource, options) {
	const { page = 1, perPage = 10 } = options;
	const { data } = await api.get(resource, { params: toParams({ ...options, page, perPage }) });
	return { items: data.data, total: data.items, pages: Math.max(1, data.pages), page };
}

export async function countOf(resource, filters = {}) {
	const { total } = await fetchPage(resource, { page: 1, perPage: 1, filters });
	return total;
}
