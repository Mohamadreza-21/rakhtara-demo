import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { keys } from "../../../../lib/query/keys";
import { ProductGridCmsSkeleton } from "../../../../components/skeletons/CmsSkeletons";
import ErrorState from "../../../../components/errors/ErrorState";
import { toast } from "sonner";
import { notifyError } from "../../../../lib/errorToast";
import { useConfirm } from "../../../../lib/hooks/useConfirm";
import { PrimaryButton, ConfirmDialog, Pagination } from "../../ui";
import ShowcaseImageCard from "./ShowcaseImageCard";
import ShowcaseImageModal from "./ShowcaseImageModal";
import {
	getShowcaseImages,
	createShowcaseImage,
	updateShowcaseImage,
	deleteShowcaseImage,
} from "../../../../services/showcase";

const NO_IMAGES = [];
const PAGE_SIZE = 12;

export default function ShowcaseImagesManager() {
	const queryClient = useQueryClient();
	const {
		data: images = NO_IMAGES,
		isPending: loading,
		error: loadError,
		refetch,
	} = useQuery({ queryKey: keys.showcase, queryFn: getShowcaseImages });

	const setImages = (update) =>
		queryClient.setQueryData(keys.showcase, (previous = NO_IMAGES) =>
			typeof update === "function" ? update(previous) : update,
		);

	const [page, setPage] = useState(1);
	const totalPages = Math.max(1, Math.ceil(images.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);
	const pageOffset = (currentPage - 1) * PAGE_SIZE;
	const visibleImages = images.slice(pageOffset, pageOffset + PAGE_SIZE);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingImage, setEditingImage] = useState(null);

	const [deletingImage, setDeletingImage] = useState(null);
	const [savingOrder, setSavingOrder] = useState(false);
	const [saving, setSaving] = useState(false);
	const { confirm, dialog: confirmDialog } = useConfirm();
	const [deleting, setDeleting] = useState(false);

	const openCreateModal = () => {
		setEditingImage(null);
		setIsModalOpen(true);
	};

	const openEditModal = (image) => {
		setEditingImage(image);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditingImage(null);
	};

	const handleSave = async (form) => {
		if (editingImage) {
			const accepted = await confirm({
				title: "ویرایش عکس ویترین",
				description: "آیا از ذخیره تغییرات این عکس مطمئن هستید؟",
				confirmLabel: "ذخیره تغییرات",
				tone: "primary",
			});
			if (!accepted) return;
		}

		setSaving(true);
		try {
			if (editingImage) {
				const updated = await updateShowcaseImage(editingImage.id, {
					...editingImage,
					src: form.src,
					alt: form.alt,
				});
				setImages((prev) =>
					prev.map((image) => (image.id === editingImage.id ? updated : image)),
				);
				toast.success("عکس ویترین بروزرسانی شد");
			} else {
				const nextOrder =
					images.reduce((max, image) => Math.max(max, image.order ?? 0), 0) + 1;
				const created = await createShowcaseImage({
					src: form.src,
					alt: form.alt,
					order: nextOrder,
				});
				setImages((prev) => [...prev, created]);
				toast.success("عکس ویترین اضافه شد");
			}
			closeModal();
		} catch (error) {
			console.error("ذخیره عکس ویترین با خطا مواجه شد:", error);
			notifyError(error, "ذخیره عکس ویترین با خطا مواجه شد");
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async () => {
		if (!deletingImage) return;
		setDeleting(true);
		try {
			await deleteShowcaseImage(deletingImage.id);
			setImages((prev) => prev.filter((image) => image.id !== deletingImage.id));
			toast.success("عکس ویترین حذف شد");
			setDeletingImage(null);
		} catch (error) {
			console.error("حذف عکس ویترین با خطا مواجه شد:", error);
			notifyError(error, "حذف عکس ویترین با خطا مواجه شد");
		} finally {
			setDeleting(false);
		}
	};

	const moveImage = async (index, direction) => {
		const targetIndex = index + direction;
		if (targetIndex < 0 || targetIndex >= images.length || savingOrder) return;

		const reordered = [...images];
		[reordered[index], reordered[targetIndex]] = [
			reordered[targetIndex],
			reordered[index],
		];
		setImages(reordered);

		const firstImage = reordered[index];
		const secondImage = reordered[targetIndex];
		setSavingOrder(true);
		try {
			await Promise.all([
				updateShowcaseImage(firstImage.id, { ...firstImage, order: index + 1 }),
				updateShowcaseImage(secondImage.id, { ...secondImage, order: targetIndex + 1 }),
			]);
			setImages((prev) =>
				prev.map((image) => {
					if (image.id === firstImage.id) return { ...image, order: index + 1 };
					if (image.id === secondImage.id) return { ...image, order: targetIndex + 1 };
					return image;
				}),
			);
		} catch (error) {
			console.error("تغییر ترتیب عکس‌ها با خطا مواجه شد:", error);
			notifyError(error, "تغییر ترتیب عکس‌ها با خطا مواجه شد");
		} finally {
			setSavingOrder(false);
		}
	};

	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]">
			<div className="flex items-center justify-between mb-5">
				<PrimaryButton type="button" onClick={openCreateModal}>
					افزودن عکس
				</PrimaryButton>
				<h3 className="font-bold text-[#111827]">تصاویر ویترین صفحه اصلی</h3>
			</div>

			{loading ? (
				<ProductGridCmsSkeleton count={3} />
			) : loadError ? (
				<ErrorState
					error={loadError}
					theme="cms"
					variant="inline"
					subject="تصاویر ویترین"
					onRetry={refetch}
				/>
			) : images.length === 0 ? (
				<div className="text-center py-6 text-sm text-[#9CA3AF]">
					هنوز عکسی اضافه نشده است
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
						{visibleImages.map((image, offset) => {
							const index = pageOffset + offset;
							return (
								<ShowcaseImageCard
									key={image.id}
									image={image}
									isFirst={index === 0}
									isLast={index === images.length - 1}
									reordering={savingOrder}
									onEdit={openEditModal}
									onDelete={setDeletingImage}
									onMove={(direction) => moveImage(index, direction)}
								/>
							);
						})}
					</div>
					<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
				</>
			)}

			<ShowcaseImageModal
				open={isModalOpen}
				image={editingImage}
				saving={saving}
				onClose={closeModal}
				onSubmit={handleSave}
			/>

			{confirmDialog}

			<ConfirmDialog
				open={Boolean(deletingImage)}
				onClose={() => setDeletingImage(null)}
				onConfirm={handleDelete}
				loading={deleting}
				title="حذف عکس ویترین"
				description="آیا از حذف این عکس از ویترین صفحه اصلی مطمئن هستید؟"
			/>
		</div>
	);
}
