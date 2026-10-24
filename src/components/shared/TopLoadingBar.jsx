import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { useLoadingStore, selectIsLoading } from "../../stores/loadingStore";

export default function TopLoadingBar() {
	const navigation = useNavigation();
	const dataLoading = useLoadingStore(selectIsLoading);
	const isLoading = navigation.state !== "idle" || dataLoading;

	const [{ visible, width }, setBar] = useState({ visible: false, width: 0 });

	useEffect(() => {
		const timers = [];
		const at = (delay, next) => timers.push(setTimeout(() => setBar(next), delay));

		if (isLoading) {
			at(0, { visible: true, width: 0 });
			at(30, { visible: true, width: 20 });
			at(250, { visible: true, width: 65 });
			at(700, { visible: true, width: 85 });
		} else {
			at(0, (previous) => (previous.visible ? { visible: true, width: 100 } : previous));
			at(300, { visible: false, width: 0 });
		}

		return () => timers.forEach(clearTimeout);
	}, [isLoading]);

	if (!visible) return null;

	return (
		<div className="fixed top-0 inset-x-0 z-[100] h-[3px] pointer-events-none" aria-hidden="true">
			<div
				className="h-full bg-camel transition-[width] duration-300 ease-out"
				style={{ width: `${width}%`, boxShadow: "0 0 8px rgba(212,169,78,0.7)" }}
			/>
		</div>
	);
}
