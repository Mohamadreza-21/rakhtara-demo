import { Skeleton } from "../../../components/shared/Skeleton";
import LoaderPill from "../../../components/shared/LoaderPill";

export default function ProductCardSkeleton({ delay = 0 }) {
	return (
		<div className="bg-white rounded-3xl overflow-hidden border border-ink/10">
			<Skeleton delay={delay} className="aspect-[4/3] w-full rounded-none" />
			<div className="p-6">
				<Skeleton delay={delay} className="h-4 w-16 rounded-full mb-4" />
				<Skeleton delay={delay} className="h-5 w-3/4 rounded mb-3" />
				<div className="flex items-center justify-between">
					<Skeleton delay={delay} className="h-4 w-20 rounded" />
					<Skeleton delay={delay} className="h-8 w-20 rounded-full" />
				</div>
			</div>
		</div>
	);
}

export function ProductGridSkeleton({ count = 6 }) {
	return (
		<div
			role="status"
			aria-busy="true"
			className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
		>
			<span className="sr-only">در حال بارگذاری محصولات...</span>
			{Array.from({ length: count }).map((_, index) => (
				<ProductCardSkeleton key={index} delay={(index % 6) * 0.07} />
			))}
		</div>
	);
}

export function ProductListingFetchSkeleton({ count = 12, label = "در حال دریافت محصولات..." }) {
	return (
		<div className="relative">
			<ProductGridSkeleton count={count} />
			<div className="absolute inset-x-0 top-24 flex justify-center pointer-events-none">
				<LoaderPill label={label} />
			</div>
		</div>
	);
}
