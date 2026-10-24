import { toast } from "sonner";
import { ERROR_TYPES, getErrorType } from "./errors";

const TITLES = {
	[ERROR_TYPES.NETWORK]: "ارتباط با سرور برقرار نشد؛ اینترنت یا سرور را بررسی کنید",
	[ERROR_TYPES.TIMEOUT]: "پاسخ‌دهی سرور بیش از حد طول کشید",
	[ERROR_TYPES.SERVER]: "خطایی در سرور رخ داده است",
	[ERROR_TYPES.UNAUTHORIZED]: "برای ادامه لازم است وارد حساب کاربری خود شوید",
	[ERROR_TYPES.FORBIDDEN]: "شما به این بخش دسترسی ندارید",
	[ERROR_TYPES.RATE_LIMIT]: "تعداد درخواست‌ها زیاد است؛ کمی صبر کنید",
	[ERROR_TYPES.NOT_FOUND]: "اطلاعات مورد نظر پیدا نشد",
	[ERROR_TYPES.UNKNOWN]: "خطای ناشناخته‌ای رخ داد",
};

export function notifyError(error, action) {
	const type = getErrorType(error);
	const title = TITLES[type];

	if (!title) {
		toast.error(action ?? "مشکلی پیش آمد، دوباره تلاش کنید");
		return;
	}
	toast.error(title, { id: type, description: action });
}
