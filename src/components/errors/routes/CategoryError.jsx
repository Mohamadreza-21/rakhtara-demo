import RouteErrorView from "../RouteErrorView";
import CategoryNotFound from "../notfound/CategoryNotFound";

export default function CategoryError() {
	return (
		<RouteErrorView
			subject="این دسته‌بندی"
			theme="site"
			homeTo="/products"
			homeLabel="همه محصولات"
			notFound={<CategoryNotFound />}
		/>
	);
}
