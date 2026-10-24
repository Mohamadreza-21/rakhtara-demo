import RouteErrorView from "../RouteErrorView";

export default function AccountError() {
	return (
		<RouteErrorView
			subject="حساب کاربری"
			theme="site"
			homeTo="/"
			homeLabel="بازگشت به خانه"
		/>
	);
}
