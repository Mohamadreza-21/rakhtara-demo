import RouteErrorView from "../RouteErrorView";

export default function CommentsError() {
	return (
		<RouteErrorView
			subject="مدیریت نظرات"
			theme="cms"
			homeTo="/admin/home"
			homeLabel="بازگشت به داشبورد"
		/>
	);
}
