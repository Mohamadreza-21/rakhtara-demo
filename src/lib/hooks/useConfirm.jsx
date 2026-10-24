import { useCallback, useState } from "react";
import ConfirmDialog from "../../features/cms/ui/ConfirmDialog";
import SiteConfirmDialog from "../../components/shared/SiteConfirmDialog";

export function useConfirm(variant = "cms") {
	const [pending, setPending] = useState(null);

	const confirm = useCallback(
		(options) => new Promise((resolve) => setPending({ options, resolve })),
		[],
	);

	const settle = (result) => {
		pending?.resolve(result);
		setPending(null);
	};

	const Dialog = variant === "site" ? SiteConfirmDialog : ConfirmDialog;

	const dialog = (
		<Dialog
			open={Boolean(pending)}
			onClose={() => settle(false)}
			onConfirm={() => settle(true)}
			{...pending?.options}
		/>
	);

	return { confirm, dialog };
}
