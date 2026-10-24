import RouteErrorView from "../RouteErrorView";

export default function ProductsError() {
	return (
		<RouteErrorView
			subject="لیست محصولات"
			theme="site"
			homeTo="/"
			homeLabel="بازگشت به خانه"
		/>
	);
}
