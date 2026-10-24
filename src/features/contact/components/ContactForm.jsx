import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { contactSchema } from "../../../utils/validators";
import { sendContactUsMessage } from "../../../services/contactUs.service";
import { invalidateMessages } from "../../../lib/query/invalidate";
import { notifyError } from "../../../lib/errorToast";
import TextField from "../../../components/forms/TextField";
import SubmitButton from "../../../components/forms/SubmitButton";

const EMPTY = { name: "", email: "", phone: "", message: "" };

export default function ContactForm({ user }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(contactSchema), defaultValues: {
			name: user?.name || "",
			email: user?.email || "",
			phone: user?.phone || "",
			message: "",
		},
	});

	async function onSubmit(values) {
		try {
			await sendContactUsMessage(values, user?.id);
			invalidateMessages();
			toast.success("پیام شما ارسال شد", { description: "به‌زودی با شما تماس می‌گیریم" });
			reset(EMPTY);
		} catch (error) {
			console.error("ارسال پیام با خطا مواجه شد:", error);
			notifyError(error, "ارسال پیام ناموفق بود، دوباره تلاش کنید");
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			className="md:col-span-3 bg-white border border-ink/10 rounded-3xl p-6 md:p-8 space-y-5"
		>
			<div className="grid sm:grid-cols-2 gap-5">
				<TextField label="نام و نام خانوادگی" placeholder="نام شما" error={errors.name} {...register("name")} />
				<TextField
					label="شماره موبایل (اختیاری)"
					type="tel"
					dir="ltr"
					placeholder="0912xxxxxxx"
					className="text-right"
					error={errors.phone}
					{...register("phone")}
				/>
			</div>

			<TextField
				label="ایمیل"
				type="email"
				dir="ltr"
				placeholder="name@email.com"
				className="text-right"
				error={errors.email}
				{...register("email")}
			/>

			<TextField
				as="textarea"
				label="متن پیام"
				rows={5}
				placeholder="پیام خود را بنویسید..."
				className="resize-none"
				error={errors.message}
				{...register("message")}
			/>

			<SubmitButton
				fullWidth={false}
				icon={Send}
				loading={isSubmitting}
				label="ارسال پیام"
				loadingLabel="در حال ارسال..."
			/>
		</form>
	);
}
