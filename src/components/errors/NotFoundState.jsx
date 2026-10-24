import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, scaleIn, stagger } from "../../lib/motion";

const THEMES = {
	site: {
		code: "text-forest",
		iconWrap: "bg-camel/20 text-forest",
		title: "text-ink",
		text: "text-ink/60",
		primary: "bg-forest text-cream hover:bg-forest-light",
		secondary: "border border-ink/15 text-ink/70 hover:bg-ink/5",
		card: "max-w-7xl mx-auto px-6 py-20",
		compact: "py-12 px-4",
	},
	cms: {
		code: "text-[#16A34A]",
		iconWrap: "bg-[#E9F7EF] text-[#16A34A]",
		title: "text-[#111827]",
		text: "text-[#6B7280]",
		primary: "bg-[#16A34A] text-white hover:bg-[#15803D]",
		secondary: "border border-[#EEF0F5] text-[#374151] hover:bg-[#F7F8FC]",
		card: "bg-white rounded-2xl border border-[#EEF0F5] py-16 px-6 mt-2",
		compact: "py-10 px-4",
	},
};

export default function NotFoundState({
	icon: Icon,
	code = "۴۰۴",
	title,
	description,
	primary,
	secondary,
	theme = "site",
	compact = false,
	children,
}) {
	const colors = THEMES[theme] || THEMES.site;

	return (
		<motion.div
			variants={stagger(0.09)}
			initial="hidden"
			animate="show"
			className={compact ? colors.compact : colors.card}
		>
			<div className="flex flex-col items-center text-center max-w-md mx-auto">
				<motion.div variants={scaleIn} className="relative mb-4">
					<motion.p
						className={`text-7xl md:text-8xl font-extrabold leading-none ${colors.code}`}
						animate={{ y: [0, -8, 0] }}
						transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
					>
						{code}
					</motion.p>
					{Icon && (
						<motion.span
							className={`absolute -top-3 -left-8 w-12 h-12 rounded-full flex items-center justify-center ${colors.iconWrap}`}
							animate={{ rotate: [-10, 10, -10] }}
							transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
						>
							<Icon size={22} />
						</motion.span>
					)}
				</motion.div>

				<motion.h1 variants={fadeUp} className={`text-2xl font-extrabold mb-3 ${colors.title}`}>
					{title}
				</motion.h1>
				<motion.p variants={fadeUp} className={`leading-7 mb-7 ${colors.text}`}>
					{description}
				</motion.p>

				{children && <motion.div variants={fadeUp}>{children}</motion.div>}

				<motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
					{primary && (
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Link
								to={primary.to}
								className={`inline-block text-sm font-bold px-6 py-3 rounded-full transition-colors ${colors.primary}`}
							>
								{primary.label}
							</Link>
						</motion.div>
					)}
					{secondary && (
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Link
								to={secondary.to}
								className={`inline-block text-sm font-bold px-6 py-3 rounded-full transition-colors ${colors.secondary}`}
							>
								{secondary.label}
							</Link>
						</motion.div>
					)}
				</motion.div>
			</div>
		</motion.div>
	);
}
