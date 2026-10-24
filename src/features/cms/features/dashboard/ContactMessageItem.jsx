import { memo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Mail, Phone, Trash2, Loader2, Send, CornerUpLeft } from "lucide-react";
import { StatusPill } from "../../ui";
import { MESSAGE_STATUS } from "../../../../services/contactUs.service";

function ContactMessageItem({
	message,
	onReply,
	onRequestDelete,
}) {
	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { isSubmitting },
	} = useForm({ defaultValues: { reply: "" } });
	const replyText = useWatch({ control, name: "reply" });

	const isAnswered = message.status === MESSAGE_STATUS.ANSWERED;

	const sendReply = async ({ reply }) => {
		const sent = await onReply(message.id, reply.trim());
		if (sent) setValue("reply", "");
	};

	return (
		<div className="border border-[#EEF0F5] rounded-xl p-4">
			<div className="flex items-start justify-between gap-4">
				<div className="min-w-0 flex-1">
					<div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-1.5">
						<span className="font-bold text-[#111827]">{message.name}</span>
						{message.date && (
							<span className="text-xs text-[#9CA3AF]">{message.date}</span>
						)}
						<StatusPill
							status={message.status || MESSAGE_STATUS.PENDING}
						/>
					</div>
					<div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-[#6B7280] mb-2">
						{message.email && (
							<span className="flex items-center gap-1.5" dir="ltr">
								<Mail size={13} />
								{message.email}
							</span>
						)}
						{message.phone && (
							<span className="flex items-center gap-1.5" dir="ltr">
								<Phone size={13} />
								{message.phone}
							</span>
						)}
					</div>
					<p className="text-sm text-[#374151] leading-6">{message.message}</p>
				</div>
				<button
					type="button"
					onClick={() => onRequestDelete(message)}
					aria-label="حذف پیام"
					className="cursor-pointer shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-[#DC2626] hover:bg-[#FEF2F2] transition"
				>
					<Trash2 size={16} />
				</button>
			</div>

			{isAnswered && message.reply && (
				<div className="mt-3 flex items-start gap-2 bg-[#F5F8FF] border border-[#E4E9F7] rounded-lg p-3">
					<CornerUpLeft size={14} className="text-[#4B5EAA] mt-0.5 shrink-0" />
					<div>
						<p className="text-xs font-bold text-[#4B5EAA] mb-1">پاسخ ما</p>
						<p className="text-sm text-[#374151] leading-6">{message.reply}</p>
					</div>
				</div>
			)}

			<form onSubmit={handleSubmit(sendReply)} className="mt-3 flex items-center gap-2">
				<input
					type="text"
					{...register("reply")}
					placeholder={isAnswered ? "ویرایش پاسخ..." : "پاسخ خود را بنویسید..."}
					className="flex-1 px-3.5 py-2.5 text-sm rounded-lg border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-forest/30 transition-colors"
				/>
				<button
					type="submit"
					disabled={isSubmitting || !replyText.trim()}
					className="cursor-pointer shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-bold bg-forest text-cream hover:bg-forest-light transition disabled:opacity-50"
				>
					{isSubmitting ? (
						<Loader2 size={14} className="animate-spin" />
					) : (
						<Send size={14} />
					)}
					{isAnswered ? "بروزرسانی پاسخ" : "ارسال پاسخ"}
				</button>
			</form>
		</div>
	);
}

export default memo(ContactMessageItem);
