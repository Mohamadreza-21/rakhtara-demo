import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import ErrorState from "./ErrorState";
import { getErrorType, ERROR_TYPES } from "../../lib/errors";

export default function RouteErrorView({
	subject = "این صفحه",
	theme = "site",
	homeTo = "/",
	homeLabel,
	notFound,
	fullScreen = false,
}) {
	const error = useRouteError();

	if (import.meta.env.DEV) console.error("[route error]", error);

	const type = getErrorType(error);

	if (type === ERROR_TYPES.NOT_FOUND && notFound) return notFound;

	const state = (
		<ErrorState
			type={type}
			error={error}
			subject={subject}
			theme={theme}
			homeTo={homeTo}
			homeLabel={homeLabel}
			onRetry={() => window.location.reload()}
			description={
				import.meta.env.DEV && type === ERROR_TYPES.RENDER && !isRouteErrorResponse(error)
					? `${error?.message || ""}`
					: undefined
			}
		/>
	);

	if (!fullScreen) return state;

	return (
		<div dir="rtl" className="min-h-screen flex items-center justify-center bg-cream font-vazir">
			<div className="w-full">{state}</div>
		</div>
	);
}
