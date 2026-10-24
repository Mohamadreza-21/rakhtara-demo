import ProductTableRow from "./ProductTableRow";
import CmsProductsNotFound from "../../../../components/errors/notfound/CmsProductsNotFound";

export default function ProductsTable({ products, onEdit, onDelete, newProductId, query, onClear }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EEF0F5] overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="text-[#9CA3AF] text-xs border-b border-[#EEF0F5]">
            <th className="text-right font-medium px-5 py-3">محصول</th>
            <th className="text-right font-medium px-5 py-3">دسته‌بندی</th>
            <th className="text-right font-medium px-5 py-3">کد کالا</th>
            <th className="text-right font-medium px-5 py-3">قیمت</th>
            <th className="text-right font-medium px-5 py-3">موجودی</th>
            <th className="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductTableRow
              key={product.id ?? product.sku}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              isNew={newProductId != null && product.id === newProductId}
            />
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={6}>
                <CmsProductsNotFound compact query={query} onClear={onClear} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
