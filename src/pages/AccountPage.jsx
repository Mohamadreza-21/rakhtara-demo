import { Link, Navigate } from "react-router-dom";
import { ChevronLeft, Mail, Phone, CalendarDays } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { canAccessPanel } from "../lib/roles";
import { getAvatarUrl } from "../utils/avatar";
import ProfileForm from "../features/account/components/ProfileForm";
import PasswordForm from "../features/account/components/PasswordForm";
import MyMessagesSection from "../features/cms/features/account/MyMessagesSection";

export default function AccountPage() {
	const { user, updateUser } = useAuth();

	if (canAccessPanel(user)) {
		return <Navigate to="/admin/home" replace />;
	}

	return (
		<div className="max-w-5xl mx-auto px-6 py-10">
			<div className="flex items-center gap-2 text-sm mb-8 text-ink/50">
				<Link to="/" className="hover:underline text-forest">
					خانه
				</Link>
				<ChevronLeft size={14} />
				<span>پنل کاربری</span>
			</div>

			<div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-5 bg-white border border-ink/10 rounded-3xl p-6 md:p-8">
				<img loading="lazy" decoding="async"
					src={getAvatarUrl(user.seed || user.name || user.email)}
					alt={user.name}
					className="w-20 h-20 rounded-full shadow-md shadow-forest/10"
				/>
				<div className="flex-1">
					<h1 className="text-2xl font-extrabold text-forest">{user.name}</h1>
					<div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-ink/60">
						<span className="flex items-center gap-1.5" dir="ltr">
							<Mail size={14} />
							{user.email}
						</span>
						<span className="flex items-center gap-1.5" dir="ltr">
							<Phone size={14} />
							{user.phone}
						</span>
						{user.joined && (
							<span className="flex items-center gap-1.5">
								<CalendarDays size={14} />
								عضویت از {user.joined}
							</span>
						)}
					</div>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<ProfileForm user={user} onSaved={updateUser} />
				<PasswordForm user={user} />
			</div>

			<MyMessagesSection userId={user.id} />
		</div>
	);
}
