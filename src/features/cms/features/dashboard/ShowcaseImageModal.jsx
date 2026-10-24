import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, PrimaryButton } from "../../ui";
import { showcaseSchema } from "../../../../utils/validators";
import TextField from "../../../../components/forms/TextField";
import ImagePicker from "../../../../components/forms/ImagePicker";

const FORM_ID = "showcase-image-form";

function ShowcaseImageForm({ image, onSubmit, saving }) {
	const {
		register,
		control,
		handleSubmit,
	} = useForm({
		resolver: zodResolver(showcaseSchema),
		defaultValues: { src: image?.src ?? "", alt: image?.alt ?? "" },
	});

	return (
		<form id={FORM_ID} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
			<fieldset disabled={saving} className="space-y-4 disabled:opacity-60">
				<Controller
					control={control}
					name="src"
					render={({ field, fieldState }) => (
						<ImagePicker
							label="تصویر"
							value={field.value}
							onChange={field.onChange}
							error={fieldState.error}
						/>
					)}
				/>
				<TextField tone="cms" label="متن جایگزین (Alt)" placeholder="مثلاً کیف چرم دست‌دوز" {...register("alt")} />
			</fieldset>
		</form>
	);
}

export default function ShowcaseImageModal({ open, image, saving, onClose, onSubmit }) {
	const handleClose = () => {
		if (saving) return;
		onClose();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			title={image ? "ویرایش عکس ویترین" : "افزودن عکس ویترین"}
			footer={
				<>
					<button
						type="button"
						onClick={handleClose}
						disabled={saving}
						className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-[#F5F6FA] transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						انصراف
					</button>
					<PrimaryButton type="submit" form={FORM_ID} loading={saving}>
						{saving ? "در حال ذخیره..." : image ? "ذخیره تغییرات" : "ذخیره عکس"}
					</PrimaryButton>
				</>
			}
		>
			<ShowcaseImageForm key={image?.id ?? "new"} image={image} onSubmit={onSubmit} saving={saving} />
		</Modal>
	);
}
