import { Suspense } from "react";
import DelayedFallback from "../components/shared/DelayedFallback";

export function withSkeleton(Page, Fallback) {
	return (
		<Suspense
			fallback={
				<DelayedFallback>
					<Fallback />
				</DelayedFallback>
			}
		>
			<Page />
		</Suspense>
	);
}
