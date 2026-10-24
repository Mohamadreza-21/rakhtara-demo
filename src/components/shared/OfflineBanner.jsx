import { useEffect } from "react";
import { WifiOff } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useOnlineStatus } from "../../lib/hooks/useOnlineStatus";

export default function OfflineBanner() {
	const online = useOnlineStatus();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (online) queryClient.invalidateQueries({ type: "active" });
	}, [online, queryClient]);

	if (online) return null;

	return (
		<div
			role="alert"
			className="fixed inset-x-0 bottom-0 z-[100] flex items-center justify-center gap-2 bg-ink px-4 py-2.5 text-sm text-cream"
		>
			<WifiOff size={16} aria-hidden="true" />
			اتصال اینترنت شما قطع است. با وصل شدن دوباره، اطلاعات به‌روز می‌شود.
		</div>
	);
}
