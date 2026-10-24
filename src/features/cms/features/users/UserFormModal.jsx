import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, PrimaryButton } from "../../ui";
import { userSchema } from "../../../../utils/validators";
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from "../../../../lib/roles";
import TextField from "../../../../components/forms/TextField";

const FORM_ID = "user-form";

function toFormValues(user) {
	return {
		name: user?.name ?? "",
		email: user?.email ?? "",
		phone: user?.phone ?? "",
		role: user?.role ?? USER_ROLE_OPTIONS[0],
		status: user?.status ?? USER_STATUS_OPTIONS[0],
	};
}

function UserForm({ user, onSubmit, submitting }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(userSchema), defaultValues: toFormValues(user) });

	return (
		<form id={FORM_ID} onSubmit={handleSubmit((values) => onSubmit?.(values))} noValidate className="space-y-4">
			<fieldset disabled={submitting} className="space-y-4 disabled:opacity-60">
				<TextField tone="cms" label="نام و نام خانوادگی" placeholder="مثلاً سارا احمدی" error={errors.name} {...register("name")} />
				<TextField
					tone="cms"
					label="ایمیل"
					type="email"
					dir="ltr"
					placeholder="sara.ahmadi@example.com"
					className="text-right"
					error={errors.email}
					{...register("email")}
				/>
				<TextField
					tone="cms"
					label="شماره موبایل"
					type="tel"
					dir="ltr"
					placeholder="0912xxxxxxx"
					className="text-right"
					error={errors.phone}
					{...register("phone")}
				/>
				<div className="grid grid-cols-2 gap-4">
					<TextField tone="cms" as="select" label="نقش" className="cursor-pointer" {...register("role")}>
						{USER_ROLE_OPTIONS.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</TextField>
					<TextField tone="cms" as="select" label="وضعیت" className="cursor-pointer" {...register("status")}>
						{USER_STATUS_OPTIONS.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</TextField>
				</div>
			</fieldset>
		</form>
	);
}

export default function UserFormModal({ open, onClose, onSubmit, user, submitting = false }) {
	const isEditMode = Boolean(user);

	const handleClose = () => {
		if (submitting) return;
		onClose?.();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			title={isEditMode ? "ویرایش کاربر" : "افزودن کاربر جدید"}
			footer={
				<>
					<button
						type="button"
						onClick={handleClose}
						disabled={submitting}
						className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-[#F5F6FA] transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						انصراف
					</button>
					<PrimaryButton type="submit" form={FORM_ID} loading={submitting}>
						{submitting ? "در حال ذخیره..." : isEditMode ? "ذخیره تغییرات" : "ذخیره کاربر"}
					</PrimaryButton>
				</>
			}
		>
			<UserForm key={user?.id ?? "new"} user={user} onSubmit={onSubmit} submitting={submitting} />
		</Modal>
	);
}
