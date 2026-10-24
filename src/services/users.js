import api from "./api";
import { toJalaliToday } from "../utils/date";
import { fetchPage, countOf } from "./paging";

const RESOURCE = "/users";

export const getUsersPage = ({ page, perPage, search, sort = "-createdAt" }) =>
	fetchPage(RESOURCE, { page, perPage, sort, contains: { name: search } });

export const countUsers = (filters) => countOf(RESOURCE, filters);

export const getRecentUsers = async (count) =>
	(await getUsersPage({ page: 1, perPage: count })).items;

export const createUser = async (userData) => {
	const createdAt = Date.now();
	const { data } = await api.post(RESOURCE, {
		joined: toJalaliToday(),
		seed: `${userData.name || "user"}-${createdAt}`,
		...userData,
		createdAt,
	});
	return data;
};

export const updateUser = async (id, user) => {
	const { data } = await api.patch(`${RESOURCE}/${id}`, user);
	return data;
};

export const deleteUser = async (id) => {
	const { data } = await api.delete(`${RESOURCE}/${id}`);
	return data;
};
