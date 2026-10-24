import { useMemo, useState } from "react";
import { CommentsTableSkeleton } from "../components/skeletons/CmsSkeletons";
import ErrorState from "../components/errors/ErrorState";
import FetchOverlay from "../components/shared/FetchOverlay";
import { toast } from "sonner";
import { notifyError } from "../lib/errorToast";
import { Trash2 } from "lucide-react";
import { PageHeader, StatCardGrid, ConfirmDialog, Pagination } from "../features/cms/ui";
import CommentsNotFound from "../components/errors/notfound/CommentsNotFound";
import StarRating from "../features/storefront/components/StarRating";
import { getCommentsPage, getCommentStats, deleteComment } from "../services/comments";
import { keys } from "../lib/query/keys";
import { invalidateComments } from "../lib/query/invalidate";
import { useQuery } from "@tanstack/react-query";
import { useServerList } from "../lib/hooks/useServerList";
import { useUrlSearch } from "../lib/hooks/useUrlSearch";

const PAGE_SIZE = 8;
const EMPTY_STATS = { total: 0, avg: 0, fiveStar: 0, low: 0 };

export default function CmsComments() {
	const search = useUrlSearch();
	const params = useMemo(() => ({ search: search.query }), [search.query]);
	const list = useServerList({
		queryKey: keys.comments.list,
		fetcher: getCommentsPage,
		params,
		pageSize: PAGE_SIZE,
	});
	const { data: stats = EMPTY_STATS } = useQuery({ queryKey: keys.stats.comments, queryFn: getCommentStats });

	const [deletingComment, setDeletingComment] = useState(null);
	const [deleting, setDeleting] = useState(false);

	const refresh = invalidateComments;

	const handleDeleteComment = async () => {
		if (!deletingComment) return;
		setDeleting(true);
		try {
			await deleteComment(deletingComment);
			toast.success("نظر با موفقیت حذف شد");
			setDeletingComment(null);
			refresh();
		} catch (error) {
			console.error("حذف نظر با خطا مواجه شد:", error);
			notifyError(error, "حذف نظر با خطا مواجه شد");
		} finally {
			setDeleting(false);
		}
	};

	const statItems = [
		{ label: "مجموع نظرات", value: stats.total },
		{
			label: "میانگین امتیاز",
			value: stats.avg.toLocaleString("fa-IR", { maximumFractionDigits: 1 }),
			valueClassName: "text-[#16A34A]",
		},
		{ label: "امتیاز ۵ ستاره", value: stats.fiveStar, valueClassName: "text-[#B45309]" },
		{ label: "امتیاز پایین (≤۲)", value: stats.low, valueClassName: "text-[#DC2626]" },
	];

	return (
		<div className="space-y-6">
			<PageHeader
				title="نظرات مشتریان"
				actionLabel="بروزرسانی"
				onAction={refresh}
			/>

			<StatCardGrid items={statItems} />

			<div className="bg-white rounded-2xl border border-[#EEF0F5] p-5 shadow-sm shadow-black/[0.02] space-y-5">
				<input
					type="text"
					value={search.input}
					onChange={(event) => {
						search.setInput(event.target.value);
					}}
					placeholder="جستجو در متن نظر..."
					className="w-full sm:w-80 rounded-xl border border-[#EEF0F5] px-4 py-2.5 text-sm outline-none focus:border-[#16A34A]"
				/>

				{list.initialLoading ? (
					<CommentsTableSkeleton />
				) : list.error ? (
					<ErrorState
						error={list.error}
						theme="cms"
						variant="inline"
						subject="لیست نظرات"
						onRetry={list.reload}
					/>
				) : (
				<FetchOverlay active={list.fetching} className="bg-white rounded-2xl border border-[#EEF0F5] overflow-x-auto">
					<table className="w-full min-w-[760px] text-sm">
						<thead>
							<tr className="text-[#9CA3AF] text-xs border-b border-[#EEF0F5]">
								<th className="text-right font-medium px-5 py-3">محصول</th>
								<th className="text-right font-medium px-5 py-3">نویسنده</th>
								<th className="text-right font-medium px-5 py-3">امتیاز</th>
								<th className="text-right font-medium px-5 py-3">متن نظر</th>
								<th className="text-right font-medium px-5 py-3">تاریخ</th>
								<th className="px-5 py-3"></th>
							</tr>
						</thead>
						<tbody>
							{list.items.length === 0 ? (
								<tr>
									<td colSpan={6}>
										<CommentsNotFound compact query={search.query} onClear={() => search.setInput("")} />
									</td>
								</tr>
							) : (
								list.items.map((comment) => (
									<tr
										key={comment.id}
										className="border-b border-[#EEF0F5] last:border-0 hover:bg-[#F7F8FC]/60 transition"
									>
										<td className="px-5 py-3 text-[#374151] font-medium whitespace-nowrap">
											{comment.productName || "—"}
										</td>
										<td className="px-5 py-3 text-[#374151] whitespace-nowrap">
											{comment.name}
										</td>
										<td className="px-5 py-3">
											<StarRating rating={Number(comment.rating || 0)} />
										</td>
										<td className="px-5 py-3 text-[#6B7280] max-w-[320px]">
											<span className="line-clamp-2">{comment.text}</span>
										</td>
										<td className="px-5 py-3 text-[#9CA3AF] whitespace-nowrap">
											{comment.date || "—"}
										</td>
										<td className="px-5 py-3">
											<button
												type="button"
												onClick={() => setDeletingComment(comment)}
												aria-label="حذف نظر"
												className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-lg text-[#DC2626] hover:bg-[#FEF2F2] transition"
											>
												<Trash2 size={16} />
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</FetchOverlay>
				)}

				<Pagination
					currentPage={list.page}
					totalPages={list.pages}
					onPageChange={list.setPage}
				/>
			</div>

			<ConfirmDialog
				open={Boolean(deletingComment)}
				onClose={() => setDeletingComment(null)}
				onConfirm={handleDeleteComment}
				loading={deleting}
				title="حذف نظر"
				description={
					deletingComment
						? `آیا از حذف نظر «${deletingComment.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`
						: ""
				}
			/>
		</div>
	);
}
