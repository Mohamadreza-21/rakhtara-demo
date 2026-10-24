import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ChevronLeft, MapPin, Phone, Mail } from "lucide-react";
import { getContactInfo } from "../services/contactUs.service";
import { keys } from "../lib/query/keys";
import { useAuth } from "../context/useAuth";
import ContactForm from "../features/contact/components/ContactForm";
import { ContactInfoSkeleton } from "../components/skeletons/SiteSkeletons";

export default function ContactUSPage() {
	const { user } = useAuth();
	const { data: contactInfo, isPending: infoLoading } = useQuery({
		queryKey: keys.contactInfo,
		queryFn: getContactInfo,
	});

	const CONTACT_INFO = contactInfo
		? [
				{ icon: MapPin, label: "آدرس", value: contactInfo.address },
				{ icon: Phone, label: "شماره تماس", value: contactInfo.phone, dir: "ltr" },
				{ icon: Mail, label: "ایمیل", value: contactInfo.email, dir: "ltr" },
			]
		: [];

	return (
		<div className="max-w-7xl mx-auto px-6 py-10">
			<div className="flex items-center gap-2 text-sm mb-8 text-ink/50">
				<Link to="/" className="hover:underline text-forest">
					خانه
				</Link>
				<ChevronLeft size={14} />
				<span>تماس با ما</span>
			</div>

			<div className="mb-12 text-center max-w-2xl mx-auto">
				<h1 className="text-3xl md:text-4xl font-extrabold text-forest mb-3">
					تماس با ما
				</h1>
				<p className="text-ink/60">
					سوالی دارید یا نیاز به راهنمایی دارید؟ فرم زیر را پر کنید یا از راه‌های
					زیر با ما در ارتباط باشید.
				</p>
			</div>

			<div className="grid md:grid-cols-5 gap-10 mb-10">
				<div className="md:col-span-2 space-y-4">
					{infoLoading && <ContactInfoSkeleton />}
					{CONTACT_INFO.map(({ icon: Icon, label, value, dir }) => (
						<div
							key={label}
							className="flex items-start gap-4 bg-white border border-ink/10 rounded-3xl p-5"
						>
							<span className="shrink-0 w-11 h-11 rounded-full bg-camel/20 flex items-center justify-center text-forest">
								<Icon size={20} />
							</span>
							<div>
								<p className="text-xs text-ink/50 mb-1">{label}</p>
								<p dir={dir} className="font-bold text-forest">
									{value}
								</p>
							</div>
						</div>
					))}
				</div>

				<ContactForm user={user} />
			</div>
		</div>
	);
}
