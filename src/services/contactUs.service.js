import api from "./api";
import { fetchPage } from "./paging";

const CONTACT_INFO_RESOURCE = "/contactInfo";
const CONTACT_MESSAGES_RESOURCE = "/contactMessages";

export const MESSAGE_STATUS = {
	PENDING: "در انتظار پاسخ",
	ANSWERED: "پاسخ داده شده",
};

export const sendContactUsMessage = async (form, userId) => {
	const payload = {
		...form,
		...(userId ? { userId } : {}),
		status: MESSAGE_STATUS.PENDING,
		reply: null,
		repliedAt: null,
		date: new Date().toLocaleDateString("fa-IR"),
		createdAt: new Date().toISOString(),
	};
	const { data } = await api.post(CONTACT_MESSAGES_RESOURCE, payload);
	return data;
};

export const getContactMessagesPage = ({ page, perPage }) =>
	fetchPage(CONTACT_MESSAGES_RESOURCE, { page, perPage, sort: "-createdAt" });

export const getMyContactMessagesPage = ({ userId, page, perPage }) =>
	fetchPage(CONTACT_MESSAGES_RESOURCE, {
		page,
		perPage,
		sort: "-createdAt",
		filters: { userId },
	});

export const replyToContactMessage = async (id, replyText) => {
	const payload = {
		reply: replyText,
		status: MESSAGE_STATUS.ANSWERED,
		repliedAt: new Date().toISOString(),
	};
	const { data } = await api.patch(`${CONTACT_MESSAGES_RESOURCE}/${id}`, payload);
	return data;
};

export const deleteContactMessage = async (id) => {
	const { data } = await api.delete(`${CONTACT_MESSAGES_RESOURCE}/${id}`);
	return data;
};

export const getContactInfo = async () => {
	const { data } = await api.get(CONTACT_INFO_RESOURCE);
	return data;
};
