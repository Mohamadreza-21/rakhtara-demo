import { MailX } from "lucide-react";
import NotFoundState from "../NotFoundState";

export default function ContactNotFound() {
	return (
		<NotFoundState
			icon={MailX}
			title="این بخش از «تماس با ما» وجود ندارد"
			description="آدرس واردشده معتبر نیست. برای ارتباط با ما به صفحه تماس برگردید."
			primary={{ to: "/contact-us", label: "تماس با ما" }}
			secondary={{ to: "/", label: "بازگشت به خانه" }}
		/>
	);
}
