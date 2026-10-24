import { useCallback } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/useAuth";
import { useConfirm } from "./useConfirm";

export function useLogout(variant = "cms") {
	const { logout: signOut } = useAuth();
	const { confirm, dialog } = useConfirm(variant);

	const requestLogout = useCallback(
		async (onDone) => {
			const accepted = await confirm({
				title: "خروج از حساب کاربری",
				description: "آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟",
				confirmLabel: "خروج",
				tone: "primary",
				icon: "logout",
			});
			if (!accepted) return;
			signOut();
			toast.success("از حساب کاربری خارج شدید");
			onDone?.();
		},
		[confirm, signOut],
	);

	return { requestLogout, logoutDialog: dialog };
}
