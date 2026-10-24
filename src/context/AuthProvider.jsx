import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext";
import { login as loginRequest, register as registerRequest, getSessionUser } from "../services/authService";
import { getAccessRole } from "../lib/roles";
import { readSession, writeSession } from "../lib/sessionStorage";

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(readSession);
	const [verifying, setVerifying] = useState(() => Boolean(readSession()));

	const commit = useCallback((nextUser) => {
		writeSession(nextUser);
		setUser(nextUser);
	}, []);

	useEffect(() => {
		const stored = readSession();
		if (!stored) return undefined;

		let ignore = false;
		getSessionUser(stored.id)
			.then((fresh) => {
				if (ignore) return;
				if (fresh === null) commit(null);
				else if (fresh) commit(fresh);
			})
			.finally(() => {
				if (!ignore) setVerifying(false);
			});
		return () => {
			ignore = true;
		};
	}, [commit]);

	const login = useCallback(
		async (credentials) => {
			const result = await loginRequest({
				identifier: credentials.identifier.trim(),
				password: credentials.password,
			});
			if (result.success) commit(result.data);
			return result;
		},
		[commit],
	);

	const register = useCallback(
		async (form) => {
			const result = await registerRequest({
				fullName: form.fullName.trim(),
				email: form.email.trim(),
				phone: form.phone.trim(),
				password: form.password,
			});
			if (result.success) commit(result.data);
			return result;
		},
		[commit],
	);

	const logout = useCallback(() => commit(null), [commit]);

	const updateUser = useCallback(
		(partial) => setUser((current) => {
			if (!current) return current;
			const next = { ...current, ...partial };
			writeSession(next);
			return next;
		}),
		[],
	);

	const value = useMemo(
		() => ({
			user,
			role: getAccessRole(user),
			isAuthenticated: Boolean(user),
			verifying,
			login,
			register,
			logout,
			updateUser,
		}),
		[user, verifying, login, register, logout, updateUser],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
