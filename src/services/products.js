import api from "./api";
import { fetchPage, countOf } from "./paging";

const RESOURCE = "/products";

const SORT_PARAMS = {
	"price-asc": "price",
	"price-desc": "-price",
	"name-asc": "name",
	"top-rated": "-rating,-ratingCount",
	newest: "-createdAt",
};

export const getProductsPage = ({ page, perPage, category, search, sort, filters }) =>
	fetchPage(RESOURCE, {
		page,
		perPage,
		sort: SORT_PARAMS[sort],
		filters: { cat: category, ...filters },
		contains: { name: search },
	});

export const countProducts = (filters) => countOf(RESOURCE, filters);

export const getProduct = async (id) => {
	const { data } = await api.get(`${RESOURCE}/${id}`);
	return data;
};

export const getFeaturedProducts = async (count) =>
	(await getProductsPage({ page: 1, perPage: count, sort: "top-rated" })).items;

export const getRelatedProducts = async (product, count) => {
	const sameCategory = await getProductsPage({
		page: 1,
		perPage: count + 1,
		category: product.cat,
	});
	return sameCategory.items.filter((related) => related.id !== product.id).slice(0, count);
};

export const createProduct = async (productData) => {
	const { data } = await api.post(RESOURCE, {
		rating: 0,
		ratingCount: 0,
		...productData,
		createdAt: Date.now(),
	});
	return data;
};

export const updateProduct = async (id, product) => {
	const { data } = await api.patch(`${RESOURCE}/${id}`, product);
	return data;
};

export const deleteProduct = async (id) => {
	const { data } = await api.delete(`${RESOURCE}/${id}`);
	return data;
};
