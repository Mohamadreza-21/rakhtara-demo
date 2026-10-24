import RouteErrorView from "../RouteErrorView";

export default function ContactError() {
	return (
		<RouteErrorView
			subject="صفحه تماس با ما"
			theme="site"
			homeTo="/"
			homeLabel="بازگشت به خانه"
		/>
	);
}
