import { PackageX } from "lucide-react";
import NotFoundState from "../NotFoundState";

export default function ProductNotFound() {
	return (
		<NotFoundState
			icon={PackageX}
			title="این محصول پیدا نشد"
			description="محصول مورد نظر حذف شده یا شناسه آن نادرست است. می‌توانید سایر محصولات فروشگاه را ببینید."
			primary={{ to: "/products", label: "مشاهده همه محصولات" }}
			secondary={{ to: "/", label: "بازگشت به خانه" }}
		/>
	);
}
