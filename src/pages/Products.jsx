import { useCallback, useEffect, useMemo, useState } from "react";
import { CmsProductsPageSkeleton } from "../components/skeletons/CmsSkeletons";
import ErrorState from "../components/errors/ErrorState";
import FetchOverlay from "../components/shared/FetchOverlay";
import { toast } from "sonner";
import { notifyError } from "../lib/errorToast";
import { PageHeader, StatCardGrid, ConfirmDialog, Pagination } from "../features/cms/ui";
import ProductsToolbar from "../features/cms/features/products/ProductsToolbar";
import ProductGrid from "../features/cms/features/products/ProductGrid";
import ProductsTable from "../features/cms/features/products/ProductsTable";
import ProductFormModal from "../features/cms/features/products/ProductFormModal";
import {
	getProductsPage,
	countProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../services/products";
import { useCmsProductsFilterStore } from "../stores/cmsProductsFilterStore";
import { useConfirm } from "../lib/hooks/useConfirm";
import { keys } from "../lib/query/keys";
import { invalidateProducts } from "../lib/query/invalidate";
import { useDebouncedValue } from "../lib/hooks/useDebouncedValue";
import { useQuery } from "@tanstack/react-query";
import { useServerList } from "../lib/hooks/useServerList";

const PAGE_SIZE = 6;
const ALL_CATEGORIES = "همه";

async function fetchProductStats() {
	const [total, outOfStock, lowStock] = await Promise.all([
		countProducts(),
		countProducts({ stock: 0 }),
		countProducts({ "stock:gt": 0, "stock:lte": 6 }),
	]);
	return { total, outOfStock, lowStock };
}

const EMPTY_STATS = { total: 0, outOfStock: 0, lowStock: 0 };

export default function Products() {
	const savedQuery = useCmsProductsFilterStore((state) => state.query);
	const activeCategory = useCmsProductsFilterStore((state) => state.category);
	const view = useCmsProductsFilterStore((state) => state.view);
	const setSavedQuery = useCmsProductsFilterStore((state) => state.setQuery);
	const setActiveCategory = useCmsProductsFilterStore((state) => state.setCategory);
	const setView = useCmsProductsFilterStore((state) => state.setView);

	const [searchInput, setSearchInput] = useState(savedQuery);
	const query = useDebouncedValue(searchInput.trim());

	useEffect(() => {
		setSavedQuery(query);
	}, [query, setSavedQuery]);

	const params = useMemo(
		() => ({
			search: query,
			category: activeCategory === ALL_CATEGORIES ? undefined : activeCategory,
		}),
		[query, activeCategory],
	);

	const list = useServerList({
		queryKey: keys.products.list,
		fetcher: getProductsPage,
		params,
		pageSize: PAGE_SIZE,
	});
	const { data: stats = EMPTY_STATS } = useQuery({ queryKey: keys.stats.products, queryFn: fetchProductStats });

	const { confirm, dialog: confirmDialog } = useConfirm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [deletingProduct, setDeletingProduct] = useState(null);
	const [newProductId, setNewProductId] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const { setPage } = list;
	const refresh = invalidateProducts;

	const handleQueryChange = useCallback(
		(value) => {
			setSearchInput(value);
			setPage(1, { replace: true });
		},
		[setPage],
	);

	const handleCategoryChange = useCallback(
		(value) => {
			setActiveCategory(value);
			setPage(1, { replace: true });
		},
		[setActiveCategory, setPage],
	);

	const openCreateModal = useCallback(() => {
		setEditingProduct(null);
		setIsModalOpen(true);
	}, []);

	const openEditModal = useCallback((product) => {
		setEditingProduct(product);
		setIsModalOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
		setEditingProduct(null);
	}, []);

	const handleSubmitProduct = async (form) => {
		if (editingProduct) {
			const accepted = await confirm({
				title: "ویرایش محصول",
				description: "آیا از ذخیره تغییرات این محصول مطمئن هستید؟",
				confirmLabel: "ذخیره تغییرات",
				loadingLabel: "در حال ذخیره...",
				tone: "primary",
			});
			if (!accepted) return;
		}

		const normalized = {
			...form,
			price: Number(form.price) || 0,
			stock: Number(form.stock) || 0,
		};

		setSubmitting(true);
		try {
			if (editingProduct) {
				await updateProduct(editingProduct.id, normalized);
				toast.success("محصول بروزرسانی شد");
			} else {
				const created = await createProduct(normalized);
				setPage(1);
				setNewProductId(created.id);
				window.setTimeout(() => setNewProductId(null), 1500);
				toast.success("محصول جدید با موفقیت افزوده شد");
			}
			closeModal();
			refresh();
		} catch (error) {
			console.error("ذخیره محصول با خطا مواجه شد:", error);
			notifyError(error, "ذخیره محصول با خطا مواجه شد");
		} finally {
			setSubmitting(false);
		}
	};

	const handleDeleteProduct = async () => {
		if (!deletingProduct) return;
		setDeleting(true);
		try {
			await deleteProduct(deletingProduct.id);
			toast.success(`محصول «${deletingProduct.name}» حذف شد`);
			setDeletingProduct(null);
			refresh();
		} catch (error) {
			console.error("حذف محصول با خطا مواجه شد:", error);
			notifyError(error, "حذف محصول با خطا مواجه شد");
		} finally {
			setDeleting(false);
		}
	};

	if (list.initialLoading) return <CmsProductsPageSkeleton />;

	if (list.error) {
		return (
			<div className="space-y-6">
				<PageHeader title="محصولات" />
				<ErrorState
					error={list.error}
					theme="cms"
					subject="لیست محصولات"
					homeTo="/admin/home"
					homeLabel="بازگشت به داشبورد"
					onRetry={list.reload}
				/>
			</div>
		);
	}

	const statItems = [
		{ label: "مجموع محصولات", value: stats.total },
		{ label: "موجود در انبار", value: stats.total - stats.outOfStock, valueClassName: "text-[#16A34A]" },
		{ label: "رو به اتمام", value: stats.lowStock, valueClassName: "text-[#B45309]" },
		{ label: "ناموجود", value: stats.outOfStock, valueClassName: "text-[#DC2626]" },
	];

	return (
		<div className="space-y-6">
			<PageHeader
				title="محصولات"
				actionLabel="محصول جدید"
				onAction={openCreateModal}
			/>

			<StatCardGrid items={statItems} />

			<div className="bg-white rounded-2xl border border-[#EEF0F5] p-5 shadow-sm shadow-black/[0.02] space-y-5">
				<ProductsToolbar
					query={searchInput}
					onQueryChange={handleQueryChange}
					activeCategory={activeCategory}
					onCategoryChange={handleCategoryChange}
					view={view}
					onViewChange={setView}
				/>

				<FetchOverlay active={list.fetching}>
				{view === "grid" ? (
					<ProductGrid
						products={list.items}
						onEdit={openEditModal}
						onDelete={setDeletingProduct}
						newProductId={newProductId}
						query={searchInput}
						onClear={() => handleQueryChange("")}
					/>
				) : (
					<ProductsTable
						products={list.items}
						onEdit={openEditModal}
						onDelete={setDeletingProduct}
						newProductId={newProductId}
						query={searchInput}
						onClear={() => handleQueryChange("")}
					/>
				)}
				</FetchOverlay>

				<Pagination
					currentPage={list.page}
					totalPages={list.pages}
					onPageChange={list.setPage}
				/>
			</div>

			<ProductFormModal
				open={isModalOpen}
				onClose={closeModal}
				onSubmit={handleSubmitProduct}
				product={editingProduct}
				submitting={submitting}
			/>

			{confirmDialog}

			<ConfirmDialog
				open={Boolean(deletingProduct)}
				onClose={() => setDeletingProduct(null)}
				onConfirm={handleDeleteProduct}
				loading={deleting}
				title="حذف محصول"
				description={
					deletingProduct
						? `آیا از حذف «${deletingProduct.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`
						: ""
				}
			/>
		</div>
	);
}
