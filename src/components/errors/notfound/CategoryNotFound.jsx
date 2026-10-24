import { LayoutGrid } from "lucide-react";
import NotFoundState from "../NotFoundState";

export default function CategoryNotFound() {
	return (
		<NotFoundState
			icon={LayoutGrid}
			title="این دسته‌بندی وجود ندارد"
			description="دسته‌بندی مورد نظر پیدا نشد. از میان دسته‌بندی‌های موجود انتخاب کنید."
			primary={{ to: "/products", label: "همه محصولات" }}
			secondary={{ to: "/#categories", label: "دسته‌بندی‌ها" }}
		/>
	);
}
