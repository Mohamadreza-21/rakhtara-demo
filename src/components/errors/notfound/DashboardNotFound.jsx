import { FileQuestion } from "lucide-react";
import NotFoundState from "../NotFoundState";

export default function DashboardNotFound() {
	return (
		<NotFoundState
			theme="cms"
			icon={FileQuestion}
			title="این بخش در پنل مدیریت وجود ندارد"
			description="آدرس واردشده در داشبورد معتبر نیست. از منوی کناری بخش مورد نظر را انتخاب کنید."
			primary={{ to: "/admin/home", label: "بازگشت به داشبورد" }}
			secondary={{ to: "/", label: "رفتن به فروشگاه" }}
		/>
	);
}
