import { useMemo, useState } from "react";
import { UsersPageSkeleton } from "../components/skeletons/CmsSkeletons";
import ErrorState from "../components/errors/ErrorState";
import FetchOverlay from "../components/shared/FetchOverlay";
import { toast } from "sonner";
import { notifyError } from "../lib/errorToast";
import { PageHeader, StatCardGrid, ConfirmDialog } from "../features/cms/ui";
import UsersTable from "../features/cms/features/users/UsersTable";
import UserFormModal from "../features/cms/features/users/UserFormModal";
import { getUsersPage, countUsers, createUser, updateUser, deleteUser } from "../services/users";
import { useConfirm } from "../lib/hooks/useConfirm";
import { keys } from "../lib/query/keys";
import { invalidateUsers } from "../lib/query/invalidate";
import { useQuery } from "@tanstack/react-query";
import { useServerList } from "../lib/hooks/useServerList";
import { useUrlSearch } from "../lib/hooks/useUrlSearch";

const PAGE_SIZE = 10;

async function fetchUserStats() {
	const [total, active, managers, support] = await Promise.all([
		countUsers(),
		countUsers({ status: "فعال" }),
		countUsers({ role: "مدیر فروشگاه" }),
		countUsers({ role: "پشتیبانی" }),
	]);
	return { total, active, managers, support };
}

const EMPTY_STATS = { total: 0, active: 0, managers: 0, support: 0 };

export default function Users() {
	const search = useUrlSearch();
	const params = useMemo(() => ({ search: search.query }), [search.query]);
	const list = useServerList({
		queryKey: keys.users.list,
		fetcher: getUsersPage,
		params,
		pageSize: PAGE_SIZE,
	});
	const { data: stats = EMPTY_STATS } = useQuery({ queryKey: keys.stats.users, queryFn: fetchUserStats });

	const { confirm, dialog: confirmDialog } = useConfirm();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingUser, setEditingUser] = useState(null);
	const [deletingUser, setDeletingUser] = useState(null);
	const [newUserId, setNewUserId] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const refresh = invalidateUsers;

	const openCreateModal = () => {
		setEditingUser(null);
		setIsModalOpen(true);
	};

	const openEditModal = (user) => {
		setEditingUser(user);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditingUser(null);
	};

	const handleSubmitUser = async (form) => {
		if (editingUser) {
			const accepted = await confirm({
				title: "ویرایش کاربر",
				description: "آیا از ذخیره تغییرات این کاربر مطمئن هستید؟",
				confirmLabel: "ذخیره تغییرات",
				loadingLabel: "در حال ذخیره...",
				tone: "primary",
			});
			if (!accepted) return;
		}
		setSubmitting(true);
		try {
			if (editingUser) {
				await updateUser(editingUser.id, form);
				toast.success("اطلاعات کاربر بروزرسانی شد");
			} else {
				const created = await createUser(form);
				list.setPage(1);
				setNewUserId(created.id);
				window.setTimeout(() => setNewUserId(null), 1500);
				toast.success("کاربر جدید با موفقیت ایجاد شد");
			}
			closeModal();
			refresh();
		} catch (error) {
			console.error("ذخیره کاربر با خطا مواجه شد:", error);
			notifyError(error, "ذخیره کاربر با خطا مواجه شد");
		} finally {
			setSubmitting(false);
		}
	};

	const handleDeleteUser = async () => {
		if (!deletingUser) return;
		setDeleting(true);
		try {
			await deleteUser(deletingUser.id);
			toast.success(`کاربر «${deletingUser.name}» حذف شد`);
			setDeletingUser(null);
			refresh();
		} catch (error) {
			console.error("حذف کاربر با خطا مواجه شد:", error);
			notifyError(error, "حذف کاربر با خطا مواجه شد");
		} finally {
			setDeleting(false);
		}
	};

	if (list.initialLoading) return <UsersPageSkeleton />;

	if (list.error) {
		return (
			<div className="space-y-6">
				<PageHeader title="کاربران" />
				<ErrorState
					error={list.error}
					theme="cms"
					subject="لیست کاربران"
					homeTo="/admin/home"
					homeLabel="بازگشت به داشبورد"
					onRetry={list.reload}
				/>
			</div>
		);
	}

	const statItems = [
		{ label: "مجموع کاربران", value: stats.total },
		{ label: "کاربران فعال", value: stats.active, valueClassName: "text-[#16A34A]" },
		{ label: "مدیران فروشگاه", value: stats.managers, valueClassName: "text-[#C026D3]" },
		{ label: "اعضای پشتیبانی", value: stats.support, valueClassName: "text-[#EA580C]" },
	];

	return (
		<div className="space-y-6">
			<PageHeader
				title="کاربران"
				actionLabel="کاربر جدید"
				onAction={openCreateModal}
			/>

			<StatCardGrid items={statItems} />

			<FetchOverlay active={list.fetching}>
				<UsersTable
					users={list.items}
					totalCount={list.total}
					query={search.input}
					onQueryChange={search.setInput}
					onEdit={openEditModal}
					onDelete={setDeletingUser}
					newUserId={newUserId}
					currentPage={list.page}
					totalPages={list.pages}
					onPageChange={list.setPage}
				/>
			</FetchOverlay>

			<UserFormModal
				open={isModalOpen}
				onClose={closeModal}
				onSubmit={handleSubmitUser}
				user={editingUser}
				submitting={submitting}
			/>

			{confirmDialog}

			<ConfirmDialog
				open={Boolean(deletingUser)}
				onClose={() => setDeletingUser(null)}
				onConfirm={handleDeleteUser}
				loading={deleting}
				title="حذف کاربر"
				description={
					deletingUser
						? `آیا از حذف «${deletingUser.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`
						: ""
				}
			/>
		</div>
	);
}
