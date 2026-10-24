import RouteErrorView from "../RouteErrorView";

export default function CmsProductsError() {
	return (
		<RouteErrorView
			subject="مدیریت محصولات"
			theme="cms"
			homeTo="/admin/home"
			homeLabel="بازگشت به داشبورد"
		/>
	);
}
