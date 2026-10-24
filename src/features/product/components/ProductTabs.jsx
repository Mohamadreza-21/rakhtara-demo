import { memo, useMemo } from "react";
import { PRODUCT_TABS } from "./constants";
import { FileText, ListChecks, MessageCircle } from "lucide-react";

function ProductTabs({ active, onChange, reviewCount }) {
	const tabs = useMemo(
		() => [
			{ id: PRODUCT_TABS.description, label: "توضیحات", icon: FileText },
			{ id: PRODUCT_TABS.specs, label: "مشخصات", icon: ListChecks },
			{
				id: PRODUCT_TABS.reviews,
				label: reviewCount > 0 ? `نظرات (${reviewCount.toLocaleString("fa-IR")})` : "نظرات",
				icon: MessageCircle,
			},
		],
		[reviewCount],
	);

	return (
		<div
			role="tablist"
			aria-label="اطلاعات محصول"
			className="flex gap-2 overflow-x-auto no-scrollbar border-b border-ink/10 mb-8"
		>
			{tabs.map(({ id, label, icon: Icon }) => {
				const selected = active === id;
				return (
					<button
						key={id}
						role="tab"
						type="button"
						aria-selected={selected}
						onClick={() => onChange(id)}
						className={`cursor-pointer shrink-0 flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 -mb-px transition-colors ${
							selected
								? "border-camel text-forest"
								: "border-transparent text-ink/50 hover:text-forest"
						}`}
					>
						<Icon size={16} />
						{label}
					</button>
				);
			})}
		</div>
	);
}

export default memo(ProductTabs);
