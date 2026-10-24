import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";
import { changePasswordSchema } from "../../../utils/validators";
import { changePassword } from "../../../services/authService";
import { useConfirm } from "../../../lib/hooks/useConfirm";
import PasswordField from "../../../components/forms/PasswordField";
import SubmitButton from "../../../components/forms/SubmitButton";

const EMPTY = { currentPassword: "", newPassword: "", confirmNewPassword: "" };

export default function PasswordForm({ user }) {
	const { confirm, dialog } = useConfirm("site");
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(changePasswordSchema), defaultValues: EMPTY });

	async function onSubmit(values) {
		const accepted = await confirm({
			title: "تغییر رمز عبور",
			description: "آیا از تغییر رمز عبور خود مطمئن هستید؟",
			confirmLabel: "تغییر رمز",
			loadingLabel: "در حال ذخیره...",
			tone: "primary",
		});
		if (!accepted) return;

		const result = await changePassword(user.id, values);
		if (result.success) {
			toast.success("رمز عبور با موفقیت تغییر کرد");
			reset(EMPTY);
		} else {
			toast.error(result.error || "تغییر رمز عبور ناموفق بود");
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			className="bg-white border border-ink/10 rounded-3xl p-6 md:p-8 space-y-5"
		>
			<h2 className="font-extrabold text-lg text-forest mb-1 flex items-center gap-2">
				<KeyRound size={18} />
				تغییر رمز عبور
			</h2>
			<p className="text-sm text-ink/50 mb-4">
				برای تغییر رمز عبور، ابتدا رمز فعلی خود را وارد کنید.
			</p>

			<PasswordField
				label="رمز عبور فعلی"
				placeholder="رمز عبور فعلی"
				autoComplete="current-password"
				error={errors.currentPassword}
				{...register("currentPassword")}
			/>

			<div className="grid sm:grid-cols-2 gap-5">
				<PasswordField
					label="رمز عبور جدید"
					placeholder="حداقل ۸ کاراکتر"
					autoComplete="new-password"
					error={errors.newPassword}
					{...register("newPassword")}
				/>
				<PasswordField
					label="تکرار رمز عبور جدید"
					placeholder="تکرار رمز عبور جدید"
					autoComplete="new-password"
					error={errors.confirmNewPassword}
					{...register("confirmNewPassword")}
				/>
			</div>

			<SubmitButton
				fullWidth={false}
				variant="ink"
				icon={KeyRound}
				loading={isSubmitting}
				label="تغییر رمز عبور"
				loadingLabel="در حال تغییر..."
			/>
			{dialog}
		</form>
	);
}
