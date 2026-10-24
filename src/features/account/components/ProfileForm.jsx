import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { updateProfileSchema } from "../../../utils/validators";
import { updateProfile } from "../../../services/authService";
import { useConfirm } from "../../../lib/hooks/useConfirm";
import TextField from "../../../components/forms/TextField";
import SubmitButton from "../../../components/forms/SubmitButton";

export default function ProfileForm({ user, onSaved }) {
	const { confirm, dialog } = useConfirm("site");
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			fullName: user.name || "",
			email: user.email || "",
			phone: user.phone || "",
		},
	});

	async function onSubmit(values) {
		const accepted = await confirm({
			title: "ویرایش اطلاعات",
			description: "آیا از ذخیره تغییرات اطلاعات خود مطمئن هستید؟",
			confirmLabel: "ذخیره تغییرات",
			loadingLabel: "در حال ذخیره...",
			tone: "primary",
		});
		if (!accepted) return;

		const result = await updateProfile(user.id, values);
		if (result.success) {
			onSaved(result.data);
			toast.success("اطلاعات شما با موفقیت بروزرسانی شد");
		} else {
			toast.error(result.error || "بروزرسانی اطلاعات ناموفق بود");
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			className="bg-white border border-ink/10 rounded-3xl p-6 md:p-8 space-y-5"
		>
			<h2 className="font-extrabold text-lg text-forest mb-1">ویرایش اطلاعات</h2>
			<p className="text-sm text-ink/50 mb-4">
				اطلاعات حساب کاربری خود را در صورت نیاز تغییر دهید.
			</p>

			<TextField label="نام و نام خانوادگی" placeholder="نام شما" error={errors.fullName} {...register("fullName")} />
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
				label="شماره موبایل"
				type="tel"
				dir="ltr"
				placeholder="0912xxxxxxx"
				className="text-right"
				error={errors.phone}
				{...register("phone")}
			/>

			<SubmitButton
				fullWidth={false}
				icon={Save}
				loading={isSubmitting}
				label="ذخیره تغییرات"
				loadingLabel="در حال ذخیره..."
			/>
			{dialog}
		</form>
	);
}
