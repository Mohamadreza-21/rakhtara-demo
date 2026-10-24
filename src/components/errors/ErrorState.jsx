import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, LogIn, RotateCw, RefreshCw } from "lucide-react";
import { fadeUp, scaleIn, stagger } from "../../lib/motion";
import { getErrorType } from "../../lib/errors";
import { ERROR_META, THEMES } from "./errorMeta";

export default function ErrorState({
	error,
	type,
	subject = "این بخش",
	onRetry,
	retrying = false,
	variant = "page",
	theme = "site",
	homeTo = "/",
	homeLabel = "بازگشت به خانه",
	title,
	description,
	className = "",
}) {
	const resolvedType = type || getErrorType(error);
	const meta = ERROR_META[resolvedType] || ERROR_META.unknown;
	const colors = THEMES[theme] || THEMES.site;
	const Icon = meta.icon;
	const compact = variant === "inline";

	const showRetry = Boolean(onRetry) && meta.retry;
	const showReload = meta.reload;

	const wrapperClass = compact
		? `${colors.card} rounded-2xl py-10 px-6`
		: theme === "cms"
			? `${colors.card} rounded-2xl py-16 px-6`
			: "max-w-7xl mx-auto px-6 py-24";

	return (
		<motion.div
			role="alert"
			variants={stagger(0.08)}
			initial="hidden"
			animate="show"
			className={`${wrapperClass} ${colors.wrap} ${className}`}
		>
			<div className="flex flex-col items-center text-center max-w-md mx-auto">
				<motion.div variants={scaleIn} className="relative mb-5">
					<motion.span
						aria-hidden="true"
						className={`absolute inset-0 rounded-full ${colors.ring}`}
						animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
						transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
					/>
					<motion.div
						className={`relative flex items-center justify-center rounded-full ${colors.iconWrap} ${
							compact ? "w-14 h-14" : "w-20 h-20"
						}`}
						animate={{ rotate: [0, -6, 6, -4, 0] }}
						transition={{ duration: 0.8, delay: 0.5 }}
					>
						<Icon size={compact ? 26 : 36} />
					</motion.div>
				</motion.div>

				{!compact && (
					<motion.p variants={fadeUp} className={`text-sm font-bold mb-2 ${colors.code}`}>
						{meta.code}
					</motion.p>
				)}

				<motion.h2
					variants={fadeUp}
					className={`font-extrabold mb-2 ${colors.title} ${compact ? "text-base" : "text-2xl"}`}
				>
					{title || meta.title}
				</motion.h2>

				<motion.p variants={fadeUp} className={`leading-7 mb-6 ${colors.text} ${compact ? "text-sm" : ""}`}>
					{description || meta.description(subject)}
				</motion.p>

				<motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
					{showRetry && (
						<motion.button
							type="button"
							onClick={onRetry}
							disabled={retrying}
							whileHover={{ scale: 1.04 }}
							whileTap={{ scale: 0.95 }}
							className={`cursor-pointer inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full disabled:opacity-60 ${colors.primary}`}
						>
							<RotateCw size={16} className={retrying ? "animate-spin" : ""} />
							تلاش دوباره
						</motion.button>
					)}

					{showReload && (
						<motion.button
							type="button"
							onClick={() => window.location.reload()}
							whileHover={{ scale: 1.04 }}
							whileTap={{ scale: 0.95 }}
							className={`cursor-pointer inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full ${colors.primary}`}
						>
							<RefreshCw size={16} />
							بارگذاری مجدد صفحه
						</motion.button>
					)}

					{meta.login && (
						<motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
							<Link
								to="/login"
								state={{ tab: "login", from: typeof window !== "undefined" ? window.location.pathname : "/" }}
								className={`inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full ${colors.primary}`}
							>
								<LogIn size={16} />
								ورود به حساب
							</Link>
						</motion.div>
					)}

					{!compact && (
						<motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
							<Link
								to={homeTo}
								className={`inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full ${
									showRetry || showReload || meta.login ? colors.secondary : colors.primary
								}`}
							>
								<Home size={16} />
								{homeLabel}
							</Link>
						</motion.div>
					)}
				</motion.div>
			</div>
		</motion.div>
	);
}
