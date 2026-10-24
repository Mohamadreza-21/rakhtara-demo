import RouteErrorView from "../RouteErrorView";

export default function HomeError() {
	return (
		<RouteErrorView
			subject="صفحه اصلی"
			theme="site"
			homeTo="/"
			homeLabel="بازگشت به خانه"
		/>
	);
}
