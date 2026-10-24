import { BookX } from "lucide-react";
import NotFoundState from "../NotFoundState";

export default function AboutNotFound() {
	return (
		<NotFoundState
			icon={BookX}
			title="این بخش از «درباره ما» وجود ندارد"
			description="آدرس واردشده در صفحه درباره ما معتبر نیست. به صفحه اصلی داستان رخت‌آرا برگردید."
			primary={{ to: "/about-us", label: "درباره ما" }}
			secondary={{ to: "/", label: "بازگشت به خانه" }}
		/>
	);
}
