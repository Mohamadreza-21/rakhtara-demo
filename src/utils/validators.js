import { z } from "zod";
import { CATEGORIES } from "../lib/data/products";
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from "../lib/roles";

const IRANIAN_PHONE_RE = /^0?9\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const nameField = z.string().trim().min(1, "نام و نام‌خانوادگی را وارد کنید");

const emailField = z
	.string()
	.trim()
	.min(1, "ایمیل را وارد کنید")
	.refine((value) => EMAIL_RE.test(value), { message: "فرمت ایمیل صحیح نیست" });

const phoneField = z
	.string()
	.trim()
	.min(1, "شماره موبایل را وارد کنید")
	.refine((value) => IRANIAN_PHONE_RE.test(value), { message: "فرمت شماره موبایل صحیح نیست" });

const passwordField = z
	.string()
	.min(1, "رمز عبور را وارد کنید")
	.min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد");

const emailOrPhoneField = z
	.string()
	.trim()
	.min(1, "ایمیل یا شماره موبایل را وارد کنید")
	.refine((value) => EMAIL_RE.test(value) || IRANIAN_PHONE_RE.test(value), {
		message: "فرمت ایمیل یا شماره موبایل صحیح نیست",
	});

const nonNegativeNumber = (emptyMessage, invalidMessage) =>
	z
		.string()
		.trim()
		.min(1, emptyMessage)
		.pipe(z.coerce.number({ message: invalidMessage }).min(0, invalidMessage));

export const loginSchema = z.object({
	identifier: emailOrPhoneField,
	password: z.string().min(1, "رمز عبور را وارد کنید"),
});

export const registerSchema = z
	.object({
		fullName: nameField,
		email: emailField,
		phone: phoneField,
		password: passwordField,
		confirmPassword: z.string(),
		acceptTerms: z.literal(true, { message: "برای ادامه باید قوانین را بپذیرید" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "رمز عبور و تکرار آن یکسان نیستند",
		path: ["confirmPassword"],
	});

export const updateProfileSchema = z.object({
	fullName: nameField,
	email: emailField,
	phone: phoneField,
});

export const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, "رمز عبور فعلی را وارد کنید"),
		newPassword: passwordField,
		confirmNewPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "رمز عبور جدید و تکرار آن یکسان نیستند",
		path: ["confirmNewPassword"],
	});

export const newsletterSchema = z.object({
	email: z
		.string()
		.trim()
		.refine((value) => EMAIL_RE.test(value), { message: "لطفاً یک ایمیل معتبر وارد کنید" }),
});

export const contactSchema = z.object({
	name: nameField,
	email: emailField,
	phone: z
		.string()
		.trim()
		.refine((value) => !value || IRANIAN_PHONE_RE.test(value), {
			message: "فرمت شماره موبایل صحیح نیست",
		}),
	message: z.string().trim().min(10, "متن پیام باید حداقل ۱۰ کاراکتر باشد"),
});

export const commentSchema = z.object({
	name: z.string().trim().min(1, "نام خود را وارد کنید"),
	text: z.string().trim().min(1, "متن نظر را وارد کنید"),
	rating: z.number().int().min(1).max(5),
});

export const productSchema = z.object({
	name: z.string().trim().min(1, "نام محصول را وارد کنید"),
	cat: z.enum(CATEGORIES.map((category) => category.name), { message: "دسته‌بندی را انتخاب کنید" }),
	sku: z.string().trim().min(1, "کد محصول را وارد کنید"),
	price: nonNegativeNumber("قیمت را وارد کنید", "قیمت معتبر نیست"),
	stock: nonNegativeNumber("موجودی را وارد کنید", "موجودی معتبر نیست"),
	sizes: z
		.string()
		.transform((value) =>
			value
				.split(/[،,]/)
				.map((size) => size.trim())
				.filter(Boolean),
		),
	desc: z.string().trim(),
	longDesc: z.string().trim(),
	image: z.string(),
});

export const userSchema = z.object({
	name: nameField,
	email: emailField,
	phone: phoneField,
	role: z.enum(USER_ROLE_OPTIONS),
	status: z.enum(USER_STATUS_OPTIONS),
});

export const showcaseSchema = z.object({
	src: z.string().min(1, "لطفاً یک تصویر انتخاب کنید"),
	alt: z.string().trim(),
});
