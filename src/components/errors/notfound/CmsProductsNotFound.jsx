import { PackageX } from "lucide-react";
import NotFoundState from "../NotFoundState";
import ClearSearchButton from "./ClearSearchButton";

export default function CmsProductsNotFound({ query, onClear, compact = false, route = false }) {
	return (
		<NotFoundState
			theme="cms"
			compact={compact}
			icon={PackageX}
			title={route ? "این آدرس در بخش مدیریت محصولات وجود ندارد" : query ? `محصولی با «${query}» پیدا نشد` : "هنوز محصولی ثبت نشده است"}
			description={
				route
					? "آدرس واردشده معتبر نیست. از لینک‌های زیر به مسیر درست برگردید."
					: query
					? "عبارت دیگری را جستجو کنید یا جستجو را پاک کنید تا همه محصولات نمایش داده شوند."
					: "با دکمه «محصول جدید» اولین محصول را اضافه کنید."
			}
			primary={{ to: "/admin/home", label: "بازگشت به داشبورد" }}
			secondary={{ to: "/admin/users", label: "مدیریت کاربران" }}
		>
			{query && onClear && <ClearSearchButton onClear={onClear} theme="cms" />}
		</NotFoundState>
	);
}
