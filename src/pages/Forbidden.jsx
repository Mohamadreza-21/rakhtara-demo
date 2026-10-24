import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { fadeUp, scaleIn, stagger } from "../lib/motion";

function Forbidden() {
	return (
		<motion.div
			dir="rtl"
			variants={stagger(0.09)}
			initial="hidden"
			animate="show"
			className="min-h-screen flex flex-col items-center justify-center gap-4 bg-cream text-ink px-6 text-center"
		>
			<motion.div variants={scaleIn} className="relative">
				<motion.span
					aria-hidden="true"
					className="absolute inset-0 rounded-full bg-rust/20"
					animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
					transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
				/>
				<motion.div
					className="relative w-24 h-24 rounded-full bg-rust/10 flex items-center justify-center"
					animate={{ rotate: [0, -8, 8, -5, 0] }}
					transition={{ duration: 0.9, delay: 0.5 }}
				>
					<ShieldAlert size={48} className="text-rust" />
				</motion.div>
			</motion.div>
			<motion.p variants={fadeUp} className="text-sm font-bold text-forest">
				۴۰۳
			</motion.p>
			<motion.h1 variants={fadeUp} className="text-2xl font-extrabold">
				دسترسی غیرمجاز
			</motion.h1>
			<motion.p variants={fadeUp} className="text-ink/60 max-w-sm leading-7">
				شما اجازه ورود به این بخش را ندارید. برای دسترسی به پنل کاربری باید
				حساب شما توسط مدیر فروشگاه تأیید شده باشد.
			</motion.p>
			<motion.div variants={fadeUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
				<Link
					to="/"
					className="mt-2 inline-block px-5 py-2.5 rounded-full bg-forest text-cream text-sm font-bold hover:bg-forest-light transition-colors"
				>
					بازگشت به صفحه اصلی
				</Link>
			</motion.div>
		</motion.div>
	);
}

export default Forbidden;
