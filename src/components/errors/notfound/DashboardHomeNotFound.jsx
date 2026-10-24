import { LayoutDashboard } from "lucide-react";
import NotFoundState from "../NotFoundState";

export default function DashboardHomeNotFound() {
	return (
		<NotFoundState
			theme="cms"
			icon={LayoutDashboard}
			title="این بخش از پیشخوان وجود ندارد"
			description="آدرس واردشده در پیشخوان معتبر نیست. به صفحه اصلی داشبورد برگردید."
			primary={{ to: "/admin/home", label: "پیشخوان" }}
			secondary={{ to: "/", label: "رفتن به فروشگاه" }}
		/>
	);
}
