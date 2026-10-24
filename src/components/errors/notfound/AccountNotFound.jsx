import { UserX } from "lucide-react";
import NotFoundState from "../NotFoundState";

export default function AccountNotFound() {
	return (
		<NotFoundState
			icon={UserX}
			title="این بخش از حساب کاربری وجود ندارد"
			description="آدرس واردشده معتبر نیست. اطلاعات حساب خود را از صفحه حساب کاربری ببینید."
			primary={{ to: "/account", label: "حساب کاربری" }}
			secondary={{ to: "/", label: "بازگشت به خانه" }}
		/>
	);
}
