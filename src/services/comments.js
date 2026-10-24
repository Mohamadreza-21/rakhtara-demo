import api from "./api";
import { fetchPage, countOf } from "./paging";

const RESOURCE = "/comments";

export const getProductCommentsPage = ({ productId, page, perPage }) =>
	fetchPage(RESOURCE, {
		page,
		perPage,
		sort: "-createdAt",
		filters: { productKey: `p${productId}` },
	});

export const getTopComments = async (count) =>
	(await fetchPage(RESOURCE, { page: 1, perPage: count, sort: "-rating,-createdAt" })).items;

export const getCommentsPage = ({ page, perPage, search }) =>
	fetchPage(RESOURCE, {
		page,
		perPage,
		sort: "-createdAt",
		contains: { text: search },
	});

async function syncProductRating(productId) {
	const { data } = await api.get(RESOURCE, { params: { productKey: `p${productId}` } });
	const count = data.length;
	const rating = count
		? Math.round((data.reduce((sum, comment) => sum + Number(comment.rating || 0), 0) / count) * 100) / 100
		: 0;
	const { data: product } = await api.patch(`/products/${productId}`, { rating, ratingCount: count });
	return product;
}

export const createComment = async (comment) => {
	const { data } = await api.post(RESOURCE, {
		...comment,
		productKey: `p${comment.productId}`,
		createdAt: Date.now(),
	});
	const product = await syncProductRating(comment.productId);
	return { comment: data, product };
};

export const deleteComment = async (comment) => {
	await api.delete(`${RESOURCE}/${comment.id}`);
	await syncProductRating(comment.productId);
};

export async function getCommentStats() {
	const counts = await Promise.all([1, 2, 3, 4, 5].map((rating) => countOf(RESOURCE, { rating })));
	const total = counts.reduce((sum, n) => sum + n, 0);
	const weighted = counts.reduce((sum, n, i) => sum + n * (i + 1), 0);
	return {
		total,
		avg: total ? weighted / total : 0,
		fiveStar: counts[4],
		low: counts[0] + counts[1],
	};
}
