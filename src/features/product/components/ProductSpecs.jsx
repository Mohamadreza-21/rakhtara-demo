import { memo } from "react";
import { toman } from "../../../lib/data/products";

function ProductSpecs({ product }) {
	const rows = [
		{ label: "دسته‌بندی", value: product.cat },
		{ label: "کد محصول", value: product.sku, dir: "ltr" },
		{ label: "سایزهای موجود", value: Array.isArray(product.sizes) ? product.sizes.join("، ") : null },
		{ label: "قیمت", value: toman(product.price) },
		{
			label: "موجودی انبار",
			value: typeof product.stock === "number" ? `${product.stock.toLocaleString("fa-IR")} عدد` : null,
		},
	].filter((row) => row.value);

	return (
		<dl className="bg-white border border-ink/10 rounded-3xl divide-y divide-ink/10 overflow-hidden">
			{rows.map((row) => (
				<div key={row.label} className="grid grid-cols-3 gap-4 px-5 sm:px-6 py-4 text-sm">
					<dt className="text-ink/50">{row.label}</dt>
					<dd dir={row.dir} className="col-span-2 font-bold text-forest text-right">
						{row.value}
					</dd>
				</div>
			))}
		</dl>
	);
}

export default memo(ProductSpecs);
