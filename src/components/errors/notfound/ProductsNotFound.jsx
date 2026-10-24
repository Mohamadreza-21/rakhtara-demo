import { PackageSearch } from "lucide-react";
import NotFoundState from "../NotFoundState";
import ClearSearchButton from "./ClearSearchButton";

export default function ProductsNotFound({ query, onClear, emptyMessage, compact = false, route = false }) {
	return (
		<NotFoundState
			compact={compact}
			icon={PackageSearch}
			title={route ? "این آدرس در بخش محصولات فروشگاه وجود ندارد" : query ? `محصولی با «${query}» پیدا نشد` : emptyMessage || "هنوز محصولی در این بخش وجود ندارد"}
			description={
				route
					? "آدرس واردشده معتبر نیست. از لینک‌های زیر به مسیر درست برگردید."
					: query
					? "عبارت دیگری را جستجو کنید یا جستجو را پاک کنید تا همه محصولات نمایش داده شوند."
					: "به‌زودی محصولات جدید اضافه می‌شوند. فعلاً از صفحه اصلی دیدن کنید."
			}
			primary={{ to: "/", label: "بازگشت به خانه" }}
			secondary={{ to: "/#categories", label: "دسته‌بندی‌ها" }}
		>
			{query && onClear && <ClearSearchButton onClear={onClear} />}
		</NotFoundState>
	);
}
