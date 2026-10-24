import ProductCard from "./ProductCard";
import CmsProductsNotFound from "../../../../components/errors/notfound/CmsProductsNotFound";

export default function ProductGrid({
	products,
	onEdit,
	onDelete,
	newProductId,
	query,
	onClear,
}) {
	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] p-5 shadow-sm shadow-black/[0.02]">
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
				{products.map((product) => (
					<ProductCard
						key={product.id ?? product.sku}
						product={product}
						onEdit={onEdit}
						onDelete={onDelete}
						isNew={newProductId != null && product.id === newProductId}
					/>
				))}
				{products.length === 0 && (
					<div className="col-span-full">
						<CmsProductsNotFound compact query={query} onClear={onClear} />
					</div>
				)}
			</div>
		</div>
	);
}
