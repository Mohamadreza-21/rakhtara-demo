import { Mail, Sparkles } from "lucide-react";
import { Skeleton, SkeletonGroup, SkeletonText } from "../shared/Skeleton";
import LoaderPill from "../shared/LoaderPill";
import { ProductGridSkeleton } from "../../features/storefront/components/ProductCardSkeleton";

function HeroBand({ chips = 0 }) {
	return (
		<div className="bg-forest">
			<div className="max-w-7xl mx-auto px-6 py-14">
				<Skeleton tone="dark" className="h-4 w-40 rounded mb-6" />
				<div className="flex items-end justify-between flex-wrap gap-4">
					<div>
						<Skeleton tone="dark" className="h-10 w-64 rounded mb-3" />
						<Skeleton tone="dark" className="h-4 w-32 rounded" />
					</div>
					{chips > 0 && (
						<div className="flex gap-2 flex-wrap">
							{Array.from({ length: chips }).map((_, index) => (
								<Skeleton key={index} tone="dark" delay={index * 0.06} className="h-9 w-24 rounded-full" />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export function HomePageSkeleton() {
	return (
		<SkeletonGroup label="در حال بارگذاری صفحه اصلی...">
			<div className="bg-forest">
				<div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
					<div>
						<Skeleton tone="dark" className="h-5 w-32 rounded-full mb-6" />
						<Skeleton tone="dark" className="h-12 w-4/5 rounded mb-4" />
						<Skeleton tone="dark" className="h-12 w-2/3 rounded mb-8" />
						<SkeletonText tone="dark" lines={3} className="mb-8" />
						<div className="flex gap-3">
							<Skeleton tone="dark" className="h-12 w-36 rounded-full" />
							<Skeleton tone="dark" className="h-12 w-32 rounded-full" />
						</div>
					</div>
					<Skeleton tone="dark" className="h-[360px] rounded-[2rem]" />
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 py-16">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
					{Array.from({ length: 4 }).map((_, index) => (
						<Skeleton key={index} delay={index * 0.08} className="h-28 rounded-3xl" />
					))}
				</div>
				<Skeleton className="h-8 w-52 rounded mb-3" />
				<Skeleton className="h-4 w-72 max-w-full rounded mb-12" />
				<ProductGridSkeleton count={6} />
			</div>
		</SkeletonGroup>
	);
}

export function ProductsPageSkeleton() {
	return (
		<SkeletonGroup label="در حال بارگذاری محصولات...">
			<HeroBand chips={5} />
			<div className="max-w-7xl mx-auto px-6 py-10">
				<div className="flex items-center justify-between mb-8">
					<Skeleton className="h-4 w-40 rounded" />
					<Skeleton className="h-10 w-48 rounded-full" />
				</div>
				<ProductGridSkeleton count={9} />
			</div>
		</SkeletonGroup>
	);
}

function Breadcrumb() {
	return (
		<div className="max-w-7xl mx-auto px-6 pt-10">
			<Skeleton className="h-4 w-40 rounded mb-8" />
		</div>
	);
}

export function AboutPageSkeleton() {
	return (
		<SkeletonGroup label="در حال بارگذاری درباره ما...">
			<Breadcrumb />
			<div className="max-w-7xl mx-auto px-6 pb-6 flex justify-center">
				<LoaderPill icon={Sparkles} label="در حال آماده‌سازی داستان رخت‌آرا..." />
			</div>
			<div className="max-w-7xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-12 items-center">
				<div>
					<Skeleton className="h-3.5 w-32 rounded mb-4" />
					<Skeleton className="h-9 w-full rounded mb-3" />
					<Skeleton className="h-9 w-3/4 rounded mb-6" />
					<SkeletonText lines={4} className="mb-8" />
					<div className="flex gap-3">
						<Skeleton className="h-12 w-36 rounded-full" />
						<Skeleton className="h-12 w-40 rounded-full" />
					</div>
				</div>
				<Skeleton className="h-[320px] md:h-[420px] rounded-[2rem]" />
			</div>
			<div className="border-y border-ink/10 bg-white">
				<div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
					{Array.from({ length: 4 }).map((_, index) => (
						<div key={index} className="text-center">
							<Skeleton delay={index * 0.08} className="h-8 w-20 rounded mx-auto mb-3" />
							<Skeleton delay={index * 0.08} className="h-3.5 w-28 rounded mx-auto" />
						</div>
					))}
				</div>
			</div>
			<div className="max-w-7xl mx-auto px-6 py-20">
				<Skeleton className="h-8 w-48 rounded mx-auto mb-12" />
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{Array.from({ length: 4 }).map((_, index) => (
						<Skeleton key={index} delay={index * 0.1} className="h-44 rounded-3xl" />
					))}
				</div>
			</div>
		</SkeletonGroup>
	);
}

export function ContactInfoSkeleton() {
	return Array.from({ length: 3 }).map((_, index) => (
		<div key={index} className="flex items-start gap-4 bg-white border border-ink/10 rounded-3xl p-5">
			<Skeleton delay={index * 0.1} className="w-11 h-11 rounded-full shrink-0" />
			<div className="flex-1">
				<Skeleton delay={index * 0.1} className="h-3 w-16 rounded mb-2" />
				<Skeleton delay={index * 0.1} className="h-4 w-36 max-w-full rounded" />
			</div>
		</div>
	));
}

export function ContactPageSkeleton() {
	return (
		<SkeletonGroup label="در حال بارگذاری تماس با ما..." className="max-w-7xl mx-auto px-6 py-10">
			<Skeleton className="h-4 w-40 rounded mb-8" />
			<div className="flex justify-center mb-8">
				<LoaderPill icon={Mail} label="در حال آماده‌سازی راه‌های ارتباطی..." />
			</div>
			<div className="mb-12 max-w-2xl mx-auto text-center">
				<Skeleton className="h-9 w-48 rounded mx-auto mb-4" />
				<Skeleton className="h-4 w-full rounded mb-2" />
				<Skeleton className="h-4 w-2/3 rounded mx-auto" />
			</div>
			<div className="grid md:grid-cols-5 gap-10 mb-10">
				<div className="md:col-span-2 space-y-4">
					<ContactInfoSkeleton />
				</div>
				<div className="md:col-span-3 bg-white border border-ink/10 rounded-3xl p-6 md:p-8 space-y-5">
					<div className="grid sm:grid-cols-2 gap-5">
						<Skeleton className="h-12 rounded-xl" />
						<Skeleton className="h-12 rounded-xl" />
					</div>
					<Skeleton className="h-12 rounded-xl" />
					<Skeleton className="h-36 rounded-xl" />
					<Skeleton className="h-12 w-40 rounded-full" />
				</div>
			</div>
		</SkeletonGroup>
	);
}

export function AccountPageSkeleton() {
	return (
		<SkeletonGroup label="در حال بارگذاری حساب کاربری..." className="max-w-4xl mx-auto px-6 py-12">
			<div className="flex items-center gap-5 mb-10">
				<Skeleton className="w-20 h-20 rounded-full shrink-0" />
				<div className="flex-1">
					<Skeleton className="h-7 w-48 rounded mb-3" />
					<Skeleton className="h-4 w-64 max-w-full rounded" />
				</div>
			</div>
			<div className="bg-white border border-ink/10 rounded-3xl p-8 space-y-6">
				{Array.from({ length: 3 }).map((_, index) => (
					<div key={index}>
						<Skeleton delay={index * 0.08} className="h-4 w-28 rounded mb-3" />
						<Skeleton delay={index * 0.08} className="h-12 rounded-xl" />
					</div>
				))}
				<Skeleton className="h-12 w-40 rounded-full" />
			</div>
		</SkeletonGroup>
	);
}

export function AuthPageSkeleton() {
	return (
		<SkeletonGroup
			label="در حال بارگذاری فرم ورود..."
			className="min-h-screen grid lg:grid-cols-2 bg-cream"
		>
			<div className="hidden lg:block bg-forest p-12">
				<Skeleton tone="dark" className="h-full min-h-[420px] rounded-[2rem]" />
			</div>
			<div className="flex items-center justify-center p-8">
				<div className="w-full max-w-md space-y-5">
					<Skeleton className="h-10 w-full rounded-full" />
					<Skeleton className="h-8 w-48 rounded" />
					<Skeleton className="h-12 rounded-xl" />
					<Skeleton className="h-12 rounded-xl" />
					<Skeleton className="h-12 rounded-full" />
				</div>
			</div>
		</SkeletonGroup>
	);
}

export function TestimonialsSkeleton({ count = 3 }) {
	return (
		<div role="status" aria-busy="true" className="grid md:grid-cols-3 gap-8">
			<span className="sr-only">در حال بارگذاری نظرات...</span>
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="bg-white rounded-3xl p-8 border border-ink/10">
					<Skeleton delay={index * 0.1} className="h-4 w-24 rounded mb-6" />
					<SkeletonText lines={4} className="mb-6" />
					<div className="flex items-center gap-3">
						<Skeleton delay={index * 0.1} className="w-10 h-10 rounded-full" />
						<Skeleton delay={index * 0.1} className="h-4 w-28 rounded" />
					</div>
				</div>
			))}
		</div>
	);
}

export function CommentsListSkeleton({ count = 3 }) {
	return (
		<div role="status" aria-busy="true" className="space-y-4">
			<span className="sr-only">در حال بارگذاری نظرات...</span>
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="bg-white border border-ink/10 rounded-2xl p-5 flex gap-4">
					<Skeleton delay={index * 0.1} className="w-11 h-11 rounded-full shrink-0" />
					<div className="flex-1">
						<Skeleton delay={index * 0.1} className="h-4 w-32 rounded mb-3" />
						<SkeletonText lines={2} />
					</div>
				</div>
			))}
		</div>
	);
}
