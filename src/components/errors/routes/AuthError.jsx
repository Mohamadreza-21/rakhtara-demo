import RouteErrorView from "../RouteErrorView";

export default function AuthError() {
	return (
		<RouteErrorView
			subject="صفحه ورود"
			theme="site"
			homeTo="/"
			homeLabel="بازگشت به خانه"
		/>
	);
}
