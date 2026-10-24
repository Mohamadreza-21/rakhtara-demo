import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, PrimaryButton } from "../../ui";
import { CATEGORIES } from "../../../../lib/data/products";
import { productSchema } from "../../../../utils/validators";
import TextField from "../../../../components/forms/TextField";
import ImagePicker from "../../../../components/forms/ImagePicker";

const FORM_ID = "product-form";

const EMPTY = {
	name: "",
	cat: CATEGORIES[0].name,
	price: "",
	stock: "",
	sku: "",
	desc: "",
	sizes: "",
	image: "",
	longDesc: "",
};

function toFormValues(product) {
	if (!product) return EMPTY;
	return {
		name: product.name ?? "",
		cat: product.cat ?? CATEGORIES[0].name,
		price: String(product.price ?? ""),
		stock: String(product.stock ?? ""),
		sku: product.sku ?? "",
		desc: product.desc ?? "",
		sizes: Array.isArray(product.sizes) ? product.sizes.join("، ") : "",
		image: product.image ?? "",
		longDesc: product.longDesc ?? "",
	};
}

function ProductForm({ product, onSubmit, submitting }) {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(productSchema), defaultValues: toFormValues(product) });

	return (
		<form id={FORM_ID} onSubmit={handleSubmit((values) => onSubmit?.(values))} noValidate className="space-y-4">
			<fieldset disabled={submitting} className="space-y-4 disabled:opacity-60">
				<Controller
					control={control}
					name="image"
					render={({ field, fieldState }) => (
						<ImagePicker
							label="تصویر محصول"
							previewAlt="پیش‌نمایش محصول"
							value={field.value}
							onChange={field.onChange}
							error={fieldState.error}
						/>
					)}
				/>

				<TextField
					tone="cms"
					label="نام محصول"
					placeholder="مثلاً کفش اسپرت مدل آریا"
					error={errors.name}
					{...register("name")}
				/>

				<div className="grid grid-cols-2 gap-4">
					<TextField tone="cms" as="select" label="دسته‌بندی" className="cursor-pointer" error={errors.cat} {...register("cat")}>
						{CATEGORIES.map((category) => (
							<option key={category.id} value={category.name}>
								{category.name}
							</option>
						))}
					</TextField>
					<TextField tone="cms" label="کد محصول (SKU)" placeholder="SH-1042" error={errors.sku} {...register("sku")} />
				</div>

				<div className="grid grid-cols-2 gap-4">
					<TextField
						tone="cms"
						label="قیمت (تومان)"
						type="number"
						min="0"
						placeholder="1250000"
						error={errors.price}
						{...register("price")}
					/>
					<TextField
						tone="cms"
						label="موجودی انبار"
						type="number"
						min="0"
						placeholder="۲۴"
						error={errors.stock}
						{...register("stock")}
					/>
				</div>

				<TextField
					tone="cms"
					label="سایزها (اختیاری، با ویرگول جدا کنید)"
					placeholder="S، M، L، XL"
					{...register("sizes")}
				/>

				<TextField
					tone="cms"
					as="textarea"
					label="توضیح کوتاه"
					rows={3}
					placeholder="توضیح کوتاهی درباره محصول بنویسید"
					className="resize-none"
					{...register("desc")}
				/>
				<TextField
					tone="cms"
					as="textarea"
					label="توضیح کامل"
					rows={8}
					placeholder="توضیح کامل درباره محصول بنویسید"
					className="resize-none"
					{...register("longDesc")}
				/>
			</fieldset>
		</form>
	);
}

export default function ProductFormModal({ open, onClose, onSubmit, product, submitting = false }) {
	const isEditMode = Boolean(product);

	const handleClose = () => {
		if (submitting) return;
		onClose?.();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			title={isEditMode ? "ویرایش محصول" : "افزودن محصول جدید"}
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
						{submitting ? "در حال ذخیره..." : isEditMode ? "ذخیره تغییرات" : "ذخیره محصول"}
					</PrimaryButton>
				</>
			}
		>
			<ProductForm key={product?.id ?? "new"} product={product} onSubmit={onSubmit} submitting={submitting} />
		</Modal>
	);
}
