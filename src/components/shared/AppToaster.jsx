import { memo } from "react";
import { Toaster } from "sonner";

const TOAST_OPTIONS = {
	style: { fontFamily: "Vazirmatn, sans-serif", textAlign: "right" },
};

function AppToaster() {
	return (
		<Toaster position="top-center" dir="rtl" richColors closeButton toastOptions={TOAST_OPTIONS} />
	);
}

export default memo(AppToaster);
