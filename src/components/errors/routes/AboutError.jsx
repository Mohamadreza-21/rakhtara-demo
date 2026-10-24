import RouteErrorView from "../RouteErrorView";

export default function AboutError() {
	return (
		<RouteErrorView
			subject="صفحه درباره ما"
			theme="site"
			homeTo="/"
			homeLabel="بازگشت به خانه"
		/>
	);
}
