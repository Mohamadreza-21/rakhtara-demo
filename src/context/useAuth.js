import { useContext } from "react";
import { AuthContext } from "./authContext";

export function useAuth() {
	const value = useContext(AuthContext);
	if (!value) throw new Error("useAuth باید داخل AuthProvider استفاده شود");
	return value;
}
