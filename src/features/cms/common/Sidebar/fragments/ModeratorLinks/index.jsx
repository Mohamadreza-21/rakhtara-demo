import NavItem from "../NavItem";
import { Home, Package, Users, MessageSquareText } from "lucide-react";

function ModeratorLinks({ onNavigate }) {
	return (
		<>
			<NavItem
				icon={<Home />}
				iconColor="text-zinc-500"
				bgColor="bg-zinc-500"
				href="/admin/home"
				label="پیشخوان"
				onClick={onNavigate}
			/>
			<NavItem
				icon={<Package />}
				iconColor="text-yellow-500"
				bgColor="bg-yellow-500"
				href="/admin/products"
				label="محصولات"
				onClick={onNavigate}
			/>
			<NavItem
				icon={<Users />}
				iconColor="text-orange-500"
				bgColor="bg-orange-500"
				href="/admin/users"
				label="کاربران"
				onClick={onNavigate}
			/>
			<NavItem
				icon={<MessageSquareText />}
				iconColor="text-purple-500"
				bgColor="bg-purple-500"
				href="/admin/comments"
				label="نظرات"
				onClick={onNavigate}
			/>
		</>
	);
}

export default ModeratorLinks;
