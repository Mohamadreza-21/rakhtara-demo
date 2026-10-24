import { UserX } from "lucide-react";
import NotFoundState from "../NotFoundState";
import ClearSearchButton from "./ClearSearchButton";

export default function UsersNotFound({ query, onClear, compact = false, route = false }) {
	return (
		<NotFoundState
			theme="cms"
			compact={compact}
			icon={UserX}
			title={route ? "این آدرس در بخش مدیریت کاربران وجود ندارد" : query ? `کاربری با «${query}» پیدا نشد` : "هنوز کاربری ثبت نشده است"}
			description={
				route
					? "آدرس واردشده معتبر نیست. از لینک‌های زیر به مسیر درست برگردید."
					: query
					? "عبارت دیگری را جستجو کنید یا جستجو را پاک کنید تا همه کاربران نمایش داده شوند."
					: "با دکمه «کاربر جدید» اولین کاربر را اضافه کنید."
			}
			primary={{ to: "/admin/home", label: "بازگشت به داشبورد" }}
			secondary={{ to: "/admin/products", label: "مدیریت محصولات" }}
		>
			{query && onClear && <ClearSearchButton onClear={onClear} theme="cms" />}
		</NotFoundState>
	);
}
