import { Skeleton, SkeletonGroup, SkeletonText } from "../shared/Skeleton";

const card = "bg-white rounded-2xl border border-[#EEF0F5] shadow-sm shadow-black/[0.02]";

function PageHeaderSkeleton() {
	return (
		<div className="flex items-center justify-between pt-6">
			<Skeleton tone="cms" className="h-8 w-40 rounded" />
			<Skeleton tone="cms" className="h-10 w-32 rounded-xl" />
		</div>
	);
}

export function StatCardsSkeleton({ count = 4 }) {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className={`${card} p-5`}>
					<Skeleton tone="cms" delay={index * 0.08} className="h-3.5 w-20 rounded mb-3" />
					<Skeleton tone="cms" delay={index * 0.08} className="h-7 w-16 rounded" />
				</div>
			))}
		</div>
	);
}

export function ProductGridCmsSkeleton({ count = 6 }) {
	return (
		<div role="status" aria-busy="true" className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
			<span className="sr-only">در حال بارگذاری محصولات...</span>
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="border border-[#EEF0F5] rounded-2xl overflow-hidden">
					<Skeleton tone="cms" delay={index * 0.07} className="h-36 rounded-none" />
					<div className="p-4 space-y-3">
						<Skeleton tone="cms" delay={index * 0.07} className="h-4 w-3/4 rounded" />
						<Skeleton tone="cms" delay={index * 0.07} className="h-3.5 w-1/2 rounded" />
					</div>
				</div>
			))}
		</div>
	);
}

export function ListCardSkeleton({ rows = 5, avatar = true }) {
	return (
		<div role="status" aria-busy="true" className="space-y-4">
			<span className="sr-only">در حال بارگذاری...</span>
			{Array.from({ length: rows }).map((_, index) => (
				<div key={index} className="flex items-center gap-3">
					{avatar && <Skeleton tone="cms" delay={index * 0.07} className="w-10 h-10 rounded-full shrink-0" />}
					<div className="flex-1">
						<Skeleton tone="cms" delay={index * 0.07} className="h-4 w-1/2 rounded mb-2" />
						<Skeleton tone="cms" delay={index * 0.07} className="h-3 w-1/3 rounded" />
					</div>
					<Skeleton tone="cms" delay={index * 0.07} className="h-6 w-14 rounded-full" />
				</div>
			))}
		</div>
	);
}

export function ChartSkeleton() {
	return (
		<div role="status" aria-busy="true" className="h-full w-full flex items-end gap-6 px-6 pb-4">
			<span className="sr-only">در حال بارگذاری نمودار...</span>
			{[55, 80, 40, 70].map((height, index) => (
				<Skeleton
					key={index}
					tone="cms"
					delay={index * 0.12}
					className="flex-1 rounded-t-lg"
					style={{ height: `${height}%` }}
				/>
			))}
		</div>
	);
}

export function SectionCardSkeleton({ lines = 3 }) {
	return (
		<div role="status" aria-busy="true" className="py-2">
			<span className="sr-only">در حال بارگذاری...</span>
			<SkeletonText tone="cms" lines={lines} />
		</div>
	);
}

export function DashboardSkeleton() {
	return (
		<SkeletonGroup label="در حال بارگذاری داشبورد..." className="space-y-6">
			<PageHeaderSkeleton />
			<StatCardsSkeleton />
			<div className={`${card} p-6`}>
				<Skeleton tone="cms" className="h-5 w-40 rounded mb-6" />
				<div className="h-72"><ChartSkeleton /></div>
			</div>
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				<div className={`${card} p-6`}><ListCardSkeleton /></div>
				<div className={`${card} p-6`}><ListCardSkeleton /></div>
			</div>
		</SkeletonGroup>
	);
}

function ToolbarSkeleton({ children }) {
	return (
		<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
			<Skeleton tone="cms" className="h-10 w-full sm:w-80 rounded-xl" />
			{children}
		</div>
	);
}

function PaginationSkeleton() {
	return (
		<div className="flex justify-center gap-2 pt-2">
			{Array.from({ length: 5 }).map((_, index) => (
				<Skeleton key={index} tone="cms" delay={index * 0.05} className="w-9 h-9 rounded-lg" />
			))}
		</div>
	);
}

export function UsersPageSkeleton() {
	return (
		<SkeletonGroup label="در حال بارگذاری کاربران..." className="space-y-6">
			<PageHeaderSkeleton />
			<StatCardsSkeleton />
			<div className={`${card} p-5 space-y-5`}>
				<ToolbarSkeleton />
				<div className="space-y-1">
					{Array.from({ length: 8 }).map((_, index) => (
						<div key={index} className="flex items-center gap-4 py-3 border-b border-[#EEF0F5] last:border-0">
							<Skeleton tone="cms" delay={index * 0.06} className="w-10 h-10 rounded-full shrink-0" />
							<div className="flex-1 space-y-2">
								<Skeleton tone="cms" delay={index * 0.06} className="h-4 w-40 rounded" />
								<Skeleton tone="cms" delay={index * 0.06} className="h-3 w-56 max-w-full rounded" />
							</div>
							<Skeleton tone="cms" delay={index * 0.06} className="hidden sm:block h-6 w-20 rounded-full" />
							<Skeleton tone="cms" delay={index * 0.06} className="h-6 w-16 rounded-full" />
							<Skeleton tone="cms" delay={index * 0.06} className="w-8 h-8 rounded-lg" />
						</div>
					))}
				</div>
				<PaginationSkeleton />
			</div>
		</SkeletonGroup>
	);
}

export function CmsProductsPageSkeleton() {
	return (
		<SkeletonGroup label="در حال بارگذاری محصولات..." className="space-y-6">
			<PageHeaderSkeleton />
			<StatCardsSkeleton />
			<div className={`${card} p-5 space-y-5`}>
				<ToolbarSkeleton>
					<div className="flex gap-2 overflow-hidden">
						{Array.from({ length: 4 }).map((_, index) => (
							<Skeleton key={index} tone="cms" delay={index * 0.05} className="h-9 w-20 rounded-full shrink-0" />
						))}
					</div>
				</ToolbarSkeleton>
				<ProductGridCmsSkeleton count={6} />
				<PaginationSkeleton />
			</div>
		</SkeletonGroup>
	);
}

export function CommentsTableSkeleton({ rows = 6 }) {
	return (
		<div role="status" aria-busy="true" className="space-y-1">
			<span className="sr-only">در حال بارگذاری نظرات...</span>
			{Array.from({ length: rows }).map((_, index) => (
				<div key={index} className="flex items-start gap-4 py-4 border-b border-[#EEF0F5] last:border-0">
					<Skeleton tone="cms" delay={index * 0.06} className="h-4 w-28 rounded shrink-0" />
					<Skeleton tone="cms" delay={index * 0.06} className="h-4 w-24 rounded shrink-0 hidden sm:block" />
					<Skeleton tone="cms" delay={index * 0.06} className="h-4 w-20 rounded shrink-0" />
					<div className="flex-1 space-y-2">
						<Skeleton tone="cms" delay={index * 0.06} className="h-3.5 w-full rounded" />
						<Skeleton tone="cms" delay={index * 0.06} className="h-3.5 w-2/3 rounded" />
					</div>
					<Skeleton tone="cms" delay={index * 0.06} className="w-8 h-8 rounded-lg shrink-0" />
				</div>
			))}
		</div>
	);
}

export function CommentsPageSkeleton() {
	return (
		<SkeletonGroup label="در حال بارگذاری نظرات..." className="space-y-6">
			<PageHeaderSkeleton />
			<StatCardsSkeleton />
			<div className={`${card} p-5 space-y-5`}>
				<ToolbarSkeleton />
				<CommentsTableSkeleton />
				<PaginationSkeleton />
			</div>
		</SkeletonGroup>
	);
}
