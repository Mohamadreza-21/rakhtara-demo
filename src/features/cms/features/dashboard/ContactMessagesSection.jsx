import { useMemo, useState } from "react";
import { keys } from "../../../../lib/query/keys";
import { invalidateMessages } from "../../../../lib/query/invalidate";
import { useServerList } from "../../../../lib/hooks/useServerList";
import FetchOverlay from "../../../../components/shared/FetchOverlay";
import { toast } from "sonner";
import { notifyError } from "../../../../lib/errorToast";
import { MessageSquare } from "lucide-react";
import { ConfirmDialog, Pagination } from "../../ui";
import { ListCardSkeleton } from "../../../../components/skeletons/CmsSkeletons";
import ContactMessageItem from "./ContactMessageItem";
import ErrorState from "../../../../components/errors/ErrorState";
import {
	getContactMessagesPage,
	deleteContactMessage,
	replyToContactMessage,
} from "../../../../services/contactUs.service";

const PAGE_SIZE = 5;

export default function ContactMessagesSection() {
	const params = useMemo(() => ({}), []);
	const list = useServerList({
		queryKey: keys.messages.list,
		fetcher: getContactMessagesPage,
		params,
		pageSize: PAGE_SIZE,
		pageKey: "messages",
	});
	const { items: messages, error, reload } = list;
	const [deletingMessage, setDeletingMessage] = useState(null);
	const [deleting, setDeleting] = useState(false);

	const handleReply = async (id, replyText) => {
		try {
			await replyToContactMessage(id, replyText);
			invalidateMessages();
			toast.success("پاسخ شما ارسال شد");
			return true;
		} catch (error) {
			console.error("ارسال پاسخ با خطا مواجه شد:", error);
			notifyError(error, "ارسال پاسخ ناموفق بود، دوباره تلاش کنید");
			return false;
		}
	};

	const handleDelete = async () => {
		if (!deletingMessage) return;
		setDeleting(true);
		try {
			await deleteContactMessage(deletingMessage.id);
			toast.success("پیام حذف شد");
			setDeletingMessage(null);
			invalidateMessages();
		} catch (error) {
			console.error("حذف پیام با خطا مواجه شد:", error);
			notifyError(error, "حذف پیام با خطا مواجه شد");
		} finally {
			setDeleting(false);
		}
	};

	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]">
			<div className="flex items-center justify-between mb-5">
				<h3 className="font-bold text-[#111827]">پیام‌های تماس با ما</h3>
				{list.total > 0 && (
					<span className="text-xs text-[#9CA3AF]">
						{list.total.toLocaleString("fa-IR")} پیام
					</span>
				)}
			</div>

			{list.initialLoading ? (
				<ListCardSkeleton rows={3} />
			) : error ? (
				<ErrorState
					error={error}
					theme="cms"
					variant="inline"
					subject="پیام‌های تماس"
					onRetry={reload}
				/>
			) : messages.length === 0 ? (
				<div className="flex flex-col items-center gap-2 py-8 text-sm text-[#9CA3AF]">
					<MessageSquare size={22} className="text-[#D1D5DB]" />
					هنوز پیامی از فرم تماس با ما ثبت نشده است
				</div>
			) : (
				<>
					<FetchOverlay active={list.fetching} className="space-y-3">
						{messages.map((message) => (
							<ContactMessageItem
								key={message.id}
								message={message}
								onReply={handleReply}
								onRequestDelete={setDeletingMessage}
							/>
						))}
					</FetchOverlay>
					<Pagination currentPage={list.page} totalPages={list.pages} onPageChange={list.setPage} />
				</>
			)}

			<ConfirmDialog
				open={Boolean(deletingMessage)}
				onClose={() => setDeletingMessage(null)}
				onConfirm={handleDelete}
				loading={deleting}
				title="حذف پیام"
				description={
					deletingMessage
						? `آیا از حذف پیام «${deletingMessage.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`
						: ""
				}
			/>
		</div>
	);
}
