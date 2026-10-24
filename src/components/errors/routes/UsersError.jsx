import RouteErrorView from "../RouteErrorView";

export default function UsersError() {
	return (
		<RouteErrorView
			subject="مدیریت کاربران"
			theme="cms"
			homeTo="/admin/home"
			homeLabel="بازگشت به داشبورد"
		/>
	);
}
