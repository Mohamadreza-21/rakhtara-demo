import api from "./api";
import { toJalaliToday } from "../utils/date";
import { hashPassword } from "../utils/hash";

const RESOURCE = "/users";

const DEFAULT_SIGNUP_ROLE = "مشتری";

async function findUsers(identifier) {
	const value = identifier.trim();
	if (!value) return [];
	const isEmail = value.includes("@");
	const params = { [isEmail ? "email:contains" : "phone:contains"]: isEmail ? value.toLowerCase() : value };
	const { data } = await api.get(RESOURCE, { params });
	return data.filter((user) => matchesIdentifier(user, value));
}

async function findConflicts(identifiers, ignoreUserId) {
	const results = await Promise.all(identifiers.map(findUsers));
	return results.flat().filter((user) => user.id !== ignoreUserId);
}

function matchesIdentifier(user, identifier) {
	const value = identifier.trim().toLowerCase();
	const emailMatch = user.email && user.email.toLowerCase() === value;
	const phoneMatch =
		user.phone && user.phone.replace(/\s/g, "") === identifier.trim();
	return Boolean(emailMatch || phoneMatch);
}

function stripPassword(user) {
	const safeUser = { ...user };
	delete safeUser.password;
	return safeUser;
}

export async function login({ identifier, password }) {
	try {
		const [user] = await findUsers(identifier);

		if (!user || user.password !== (await hashPassword(password))) {
			return {
				success: false,
				data: null,
				error: "ایمیل/شماره موبایل یا رمز عبور اشتباه است",
			};
		}

		if (user.status === "غیرفعال") {
			return {
				success: false,
				data: null,
				error: "حساب کاربری شما غیرفعال شده است. لطفاً با پشتیبانی تماس بگیرید.",
			};
		}

		return { success: true, data: stripPassword(user), error: null };
	} catch {
		return {
			success: false,
			data: null,
			error: "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.",
		};
	}
}

export async function register({ fullName, email, phone, password }) {
	try {
		const conflicts = await findConflicts([email, phone]);

		if (conflicts.length > 0) {
			return {
				success: false,
				data: null,
				error: "کاربری با این ایمیل یا شماره موبایل قبلاً ثبت‌نام کرده است",
			};
		}

		const payload = {
			name: fullName,
			email,
			phone,
			password: await hashPassword(password),
			role: DEFAULT_SIGNUP_ROLE,
			status: "فعال",
			joined: toJalaliToday(),
			createdAt: Date.now(),
			seed: `${fullName}-${Date.now()}`,
		};

		const { data } = await api.post(RESOURCE, payload);

		return { success: true, data: stripPassword(data), error: null };
	} catch {
		return {
			success: false,
			data: null,
			error: "ثبت‌نام ناموفق بود، دوباره تلاش کنید",
		};
	}
}

export async function updateProfile(userId, { fullName, email, phone }) {
	try {
		const conflicts = await findConflicts([email, phone], userId);

		if (conflicts.length > 0) {
			return {
				success: false,
				data: null,
				error: "این ایمیل یا شماره موبایل قبلاً توسط کاربر دیگری استفاده شده است",
			};
		}

		const { data } = await api.patch(`${RESOURCE}/${userId}`, {
			name: fullName,
			email,
			phone,
		});

		return { success: true, data: stripPassword(data), error: null };
	} catch {
		return {
			success: false,
			data: null,
			error: "بروزرسانی اطلاعات ناموفق بود، دوباره تلاش کنید",
		};
	}
}

export async function changePassword(userId, { currentPassword, newPassword }) {
	try {
		const { data: user } = await api.get(`${RESOURCE}/${userId}`);

		if (!user || user.password !== (await hashPassword(currentPassword))) {
			return {
				success: false,
				data: null,
				error: "رمز عبور فعلی اشتباه است",
			};
		}

		const { data } = await api.patch(`${RESOURCE}/${userId}`, {
			password: await hashPassword(newPassword),
		});

		return { success: true, data: stripPassword(data), error: null };
	} catch {
		return {
			success: false,
			data: null,
			error: "تغییر رمز عبور ناموفق بود، دوباره تلاش کنید",
		};
	}
}

export async function getSessionUser(userId) {
	try {
		const { data } = await api.get(`${RESOURCE}/${userId}`);
		return data.status === "غیرفعال" ? null : stripPassword(data);
	} catch (error) {
		return error.response?.status === 404 ? null : undefined;
	}
}
