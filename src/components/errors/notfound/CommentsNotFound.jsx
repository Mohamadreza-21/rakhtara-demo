import { MessageSquareOff } from "lucide-react";
import NotFoundState from "../NotFoundState";
import ClearSearchButton from "./ClearSearchButton";

export default function CommentsNotFound({ query, onClear, compact = false, route = false }) {
	return (
		<NotFoundState
			theme="cms"
			compact={compact}
			icon={MessageSquareOff}
			title={route ? "این آدرس در بخش مدیریت نظرات وجود ندارد" : query ? `نظری با «${query}» پیدا نشد` : "هنوز نظری ثبت نشده است"}
			description={
				route
					? "آدرس واردشده معتبر نیست. از لینک‌های زیر به مسیر درست برگردید."
					: query
					? "عبارت دیگری را جستجو کنید یا جستجو را پاک کنید تا همه نظرات نمایش داده شوند."
					: "وقتی کاربران برای محصولات نظر بگذارند، اینجا نمایش داده می‌شود."
			}
			primary={{ to: "/admin/home", label: "بازگشت به داشبورد" }}
			secondary={{ to: "/admin/products", label: "مدیریت محصولات" }}
		>
			{query && onClear && <ClearSearchButton onClear={onClear} theme="cms" />}
		</NotFoundState>
	);
}
