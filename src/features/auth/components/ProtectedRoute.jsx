import { Navigate, useLocation } from "react-router-dom";
import PageLoader from "../../../components/shared/PageLoader";
import { useAuth } from "../../../context/useAuth";
import { ROLES, hasAccess } from "../../../lib/roles";

export default function ProtectedRoute({ role = ROLES.USER, children }) {
	const { user, verifying } = useAuth();
	const location = useLocation();

	if (verifying) return <PageLoader fullScreen label="در حال بررسی دسترسی" />;

	if (!user) {
		const from = `${location.pathname}${location.search}`;
		return <Navigate to="/login" replace state={{ from, tab: "login" }} />;
	}

	if (!hasAccess(user, role)) return <Navigate to="/403" replace />;

	return children;
}
