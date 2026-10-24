import RouteErrorView from "../RouteErrorView";

export default function DashboardHomeError() {
	return (
		<RouteErrorView
			subject="داشبورد"
			theme="cms"
			homeTo="/admin/home"
			homeLabel="بازگشت به داشبورد"
		/>
	);
}
