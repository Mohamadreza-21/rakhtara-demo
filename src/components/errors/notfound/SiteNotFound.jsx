import { Compass } from "lucide-react";
import NotFoundState from "../NotFoundState";

export default function SiteNotFound() {
	return (
		<NotFoundState
			icon={Compass}
			title="صفحه‌ای که دنبالش می‌گردید پیدا نشد"
			description="آدرس را اشتباه وارد کرده‌اید یا این صفحه دیگر وجود ندارد. از لینک‌های زیر ادامه دهید."
			primary={{ to: "/", label: "بازگشت به خانه" }}
			secondary={{ to: "/products", label: "مشاهده محصولات" }}
		/>
	);
}
