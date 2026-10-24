import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { notifyError } from "../../../lib/errorToast";
import { MessageCircle } from "lucide-react";
import { CommentsListSkeleton } from "../../../components/skeletons/SiteSkeletons";
import ErrorState from "../../../components/errors/ErrorState";
import FetchOverlay from "../../../components/shared/FetchOverlay";
import Pagination from "./Pagination";
import { useServerList } from "../../../lib/hooks/useServerList";
import StarRating from "./StarRating";
import CommentCard from "./comments/CommentCard";
import CommentForm from "./comments/CommentForm";
import { keys } from "../../../lib/query/keys";
import { invalidateComments } from "../../../lib/query/invalidate";
import { getProductCommentsPage, createComment } from "../../../services/comments";

const PAGE_SIZE = 12;

export default function ProductComments({ product, onProductChange }) {
	const productId = product.id;
	const params = useMemo(() => ({ productId }), [productId]);
	const list = useServerList({
		queryKey: keys.comments.ofProduct(productId),
		fetcher: getProductCommentsPage,
		params,
		pageSize: PAGE_SIZE,
		pageKey: "comments",
	});
	const { items, error, reload } = list;
	const loading = list.initialLoading;

	const [submitting, setSubmitting] = useState(false);
	const [newCommentId, setNewCommentId] = useState(null);
	const highlightTimer = useRef(null);

	useEffect(() => () => clearTimeout(highlightTimer.current), []);

	const handleSubmit = useCallback(
		async ({ name, text, rating }) => {
			setSubmitting(true);
			try {
				const { comment, product: updatedProduct } = await createComment({
					productId: String(productId),
					productName: product.name,
					name,
					text,
					rating,
					date: new Date().toLocaleDateString("fa-IR"),
				});
				await invalidateComments();
				onProductChange?.(updatedProduct);
				setNewCommentId(comment.id);
				clearTimeout(highlightTimer.current);
				highlightTimer.current = setTimeout(() => setNewCommentId(null), 1500);
				toast.success("نظر شما ثبت شد");
				return true;
			} catch (submitError) {
				console.error("ثبت نظر با خطا مواجه شد:", submitError);
				notifyError(submitError, "ثبت نظر با خطا مواجه شد");
				return false;
			} finally {
				setSubmitting(false);
			}
		},
		[productId, product.name, onProductChange],
	);

	return (
		<div>
			<div className="flex items-center justify-between flex-wrap gap-3 mb-8">
				<h2 className="text-2xl font-extrabold text-forest flex items-center gap-2">
					<MessageCircle size={22} />
					نظرات مشتریان
				</h2>
				{product.ratingCount > 0 && (
					<div className="flex items-center gap-2">
						<StarRating rating={product.rating} />
						<span className="text-sm text-ink/60">
							({product.rating.toLocaleString("fa-IR", { maximumFractionDigits: 1 })} از{" "}
							{product.ratingCount.toLocaleString("fa-IR")} نظر)
						</span>
					</div>
				)}
			</div>

			{loading ? (
				<div className="mb-10">
					<CommentsListSkeleton count={3} />
				</div>
			) : error ? (
				<div className="mb-10">
					<ErrorState error={error} variant="inline" subject="نظرات این محصول" onRetry={reload} />
				</div>
			) : items.length === 0 ? (
				<p className="text-ink/50 mb-10">
					هنوز نظری برای این محصول ثبت نشده است. اولین نفری باشید که نظر می‌دهد!
				</p>
			) : (
				<div className="mb-12">
					<FetchOverlay active={list.fetching} className="space-y-5">
						{items.map((comment) => (
							<CommentCard key={comment.id} comment={comment} highlighted={comment.id === newCommentId} />
						))}
					</FetchOverlay>
					<Pagination currentPage={list.page} totalPages={list.pages} onPageChange={list.setPage} className="mt-8" />
				</div>
			)}

			<CommentForm onSubmit={handleSubmit} submitting={submitting} />
		</div>
	);
}
