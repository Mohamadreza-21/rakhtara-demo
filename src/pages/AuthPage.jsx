import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "../features/auth/components/AuthLayout";
import LoginForm from "../features/auth/components/LoginForm";
import RegisterForm from "../features/auth/components/RegisterForm";
import { useAuth } from "../context/useAuth";
import { canAccessPanel } from "../lib/roles";

export default function AuthPage() {
	const location = useLocation();
	const { user, isAuthenticated } = useAuth();
	const [tab, setTab] = useState(
		location.state?.tab === "register" ? "register" : "login",
	);
	const navigate = useNavigate();
	const routeByRole = (loggedInUser) => {
		const isAdmin = canAccessPanel(loggedInUser);
		const from = location.state?.from;
		const allowedFrom = from && (isAdmin || !from.startsWith("/admin")) ? from : null;
		navigate(allowedFrom || (isAdmin ? "/admin/home" : "/"), { replace: true });
	};

	useEffect(() => {
		if (isAuthenticated) {
			toast("شما قبلاً وارد حساب کاربری خود شده‌اید");
			navigate(canAccessPanel(user) ? "/admin/home" : "/account", {
				replace: true,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthLayout tab={tab} setTab={setTab}>
			{tab === "login" ? (
				<LoginForm onSuccess={routeByRole} />
			) : (
				<RegisterForm onSuccess={routeByRole} />
			)}
		</AuthLayout>
	);
}
