import { Skeleton, SkeletonGroup } from "../../../components/shared/Skeleton";
import { ProductGridSkeleton } from "./ProductCardSkeleton";

export default function ProductDetailSkeleton() {
	return (
		<SkeletonGroup label="در حال بارگذاری محصول..." className="max-w-7xl mx-auto px-6 py-10">
			<Skeleton className="h-4 w-40 rounded mb-8" />

			<div className="grid md:grid-cols-2 gap-12 mb-20">
				<Skeleton className="rounded-[2rem] h-[380px] md:h-[460px] w-full" />

				<div>
					<Skeleton className="h-5 w-24 rounded-full mb-4" />
					<Skeleton className="h-9 w-3/4 rounded mb-4" />
					<Skeleton className="h-4 w-full rounded mb-2" />
					<Skeleton className="h-4 w-5/6 rounded mb-8" />
					<Skeleton className="h-8 w-32 rounded mb-8" />
					<div className="flex items-center gap-4 mb-8">
						<Skeleton className="h-12 w-28 rounded-full" />
						<Skeleton className="h-12 flex-1 rounded-full" />
					</div>
					<div className="grid grid-cols-3 gap-4 pt-6 border-t border-ink/10">
						{Array.from({ length: 3 }).map((_, index) => (
							<Skeleton key={index} className="h-10 rounded mx-auto w-16" />
						))}
					</div>
				</div>
			</div>

			<Skeleton className="h-7 w-44 rounded mb-8" />
			<ProductGridSkeleton count={3} />
		</SkeletonGroup>
	);
}
