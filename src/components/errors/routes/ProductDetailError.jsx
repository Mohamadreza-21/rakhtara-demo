import RouteErrorView from "../RouteErrorView";
import ProductNotFound from "../notfound/ProductNotFound";

export default function ProductDetailError() {
	return (
		<RouteErrorView
			subject="جزئیات محصول"
			theme="site"
			homeTo="/products"
			homeLabel="همه محصولات"
			notFound={<ProductNotFound />}
		/>
	);
}
