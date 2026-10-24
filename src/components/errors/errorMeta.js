import {
	WifiOff,
	Clock,
	ServerCrash,
	LogIn,
	ShieldAlert,
	SearchX,
	Gauge,
	DownloadCloud,
	Bug,
	TriangleAlert,
} from "lucide-react";
import { ERROR_TYPES } from "../../lib/errors";

export const ERROR_META = {
	[ERROR_TYPES.NETWORK]: {
		icon: WifiOff,
		code: "اتصال",
		title: "ارتباط با سرور برقرار نشد",
		description: (subject) =>
			`اتصال اینترنت یا سرور قطع است و ${subject} بارگذاری نشد. اتصال خود را بررسی کنید و دوباره تلاش کنید.`,
		retry: true,
	},
	[ERROR_TYPES.TIMEOUT]: {
		icon: Clock,
		code: "زمان",
		title: "پاسخ‌دهی سرور طول کشید",
		description: (subject) =>
			`درخواست بیش از حد معمول طول کشید و ${subject} بارگذاری نشد. چند لحظه بعد دوباره تلاش کنید.`,
		retry: true,
	},
	[ERROR_TYPES.SERVER]: {
		icon: ServerCrash,
		code: "۵۰۰",
		title: "خطایی در سرور رخ داده است",
		description: (subject) =>
			`مشکلی در سمت سرور پیش آمده و ${subject} در دسترس نیست. تیم فنی در حال بررسی است.`,
		retry: true,
	},
	[ERROR_TYPES.UNAUTHORIZED]: {
		icon: LogIn,
		code: "۴۰۱",
		title: "ابتدا وارد حساب کاربری شوید",
		description: (subject) =>
			`برای دیدن ${subject} باید وارد حساب کاربری خود باشید یا نشست شما منقضی شده است.`,
		login: true,
	},
	[ERROR_TYPES.FORBIDDEN]: {
		icon: ShieldAlert,
		code: "۴۰۳",
		title: "دسترسی غیرمجاز",
		description: (subject) => `شما اجازه مشاهده ${subject} را ندارید.`,
	},
	[ERROR_TYPES.NOT_FOUND]: {
		icon: SearchX,
		code: "۴۰۴",
		title: "اطلاعات مورد نظر پیدا نشد",
		description: (subject) => `${subject} روی سرور وجود ندارد یا حذف شده است.`,
		retry: true,
	},
	[ERROR_TYPES.RATE_LIMIT]: {
		icon: Gauge,
		code: "۴۲۹",
		title: "تعداد درخواست‌ها بیش از حد مجاز است",
		description: () => "لطفاً کمی صبر کنید و سپس دوباره تلاش کنید.",
		retry: true,
	},
	[ERROR_TYPES.CHUNK]: {
		icon: DownloadCloud,
		code: "بارگذاری",
		title: "بارگذاری این بخش ناموفق بود",
		description: () =>
			"احتمالاً نسخه جدیدی از سایت منتشر شده یا اتصال شما ناپایدار است. صفحه را دوباره بارگذاری کنید.",
		reload: true,
	},
	[ERROR_TYPES.RENDER]: {
		icon: Bug,
		code: "خطا",
		title: "در نمایش صفحه مشکلی پیش آمد",
		description: (subject) =>
			`هنگام نمایش ${subject} خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید یا به صفحه اصلی بازگردید.`,
		retry: true,
	},
	[ERROR_TYPES.UNKNOWN]: {
		icon: TriangleAlert,
		code: "خطا",
		title: "خطای ناشناخته",
		description: (subject) => `بارگذاری ${subject} با مشکل روبه‌رو شد. دوباره تلاش کنید.`,
		retry: true,
	},
};

export const THEMES = {
	site: {
		wrap: "text-ink",
		card: "bg-white border border-ink/10 shadow-sm",
		iconWrap: "bg-rust/10 text-rust",
		ring: "bg-rust/20",
		code: "text-forest",
		title: "text-forest",
		text: "text-ink/60",
		primary: "bg-forest text-cream hover:bg-forest-light",
		secondary: "border border-ink/15 text-ink/70 hover:bg-ink/5",
	},
	cms: {
		wrap: "text-[#111827]",
		card: "bg-white border border-[#EEF0F5] shadow-sm shadow-black/[0.02]",
		iconWrap: "bg-[#FEF2F2] text-[#DC2626]",
		ring: "bg-[#DC2626]/15",
		code: "text-[#16A34A]",
		title: "text-[#111827]",
		text: "text-[#6B7280]",
		primary: "bg-[#16A34A] text-white hover:bg-[#15803D]",
		secondary: "border border-[#EEF0F5] text-[#374151] hover:bg-[#F7F8FC]",
	},
};
