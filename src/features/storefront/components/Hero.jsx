import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { EASE, fadeUp, scaleIn, stagger } from "../../../lib/motion";

const STATS = [
	{ value: "+۸", label: "سال تجربه در پوشاک" },
	{ value: "+۴۰هزار", label: "مشتری راضی" },
	{ value: "۴٫۹", label: "میانگین امتیاز" },
];

const float = (distance, duration, delay = 0) => ({
	animate: { y: [0, -distance, 0] },
	transition: { duration, delay, repeat: Infinity, ease: "easeInOut" },
});

function WeavePattern() {
	return (
		<svg
			aria-hidden="true"
			className="absolute inset-0 w-full h-full opacity-[0.09]"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<pattern
					id="weave"
					width="46"
					height="46"
					patternUnits="userSpaceOnUse"
					patternTransform="rotate(45)"
				>
					<line x1="0" y1="0" x2="0" y2="46" stroke="#D4A94E" strokeWidth="1" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#weave)" />
		</svg>
	);
}

function HeroVisual() {
	return (
		<motion.div
			variants={scaleIn}
			className="relative mx-auto w-full max-w-[340px] md:max-w-[440px] aspect-[5/6.4]"
		>
			<div
				aria-hidden="true"
				className="absolute -inset-4 rounded-t-[999px] rounded-b-[2rem] border border-dashed border-camel/50"
			/>

			<div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-3xl bg-gradient-to-br from-camel-light via-camel to-rust shadow-[0_30px_60px_-10px_rgba(0,0,0,0.45)]">
				<motion.div
					aria-hidden="true"
					className="absolute left-1/2 top-[16%] -translate-x-1/2 w-[38%] aspect-square rounded-full bg-cream/90"
					animate={{ scale: [1, 1.06, 1] }}
					transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
				/>
				<div className="absolute -left-[8%] top-[58%] w-[116%] h-[55%] rounded-[50%] bg-forest/90" />
				<div className="absolute -left-[8%] top-[70%] w-[116%] h-[60%] rounded-[50%] bg-forest-dark/95" />
				<div
					aria-hidden="true"
					className="absolute left-[12%] right-[12%] top-[70%] border-t-2 border-dashed border-camel"
				/>
			</div>

			<motion.div
				{...float(8, 5)}
				className="absolute -top-2 -right-4 md:right-[-24px] flex items-center gap-3 rounded-2xl bg-cream/95 px-4 py-3 shadow-xl"
			>
				<div className="text-right">
					<p className="text-camel-dark text-sm tracking-widest leading-5">★★★★★</p>
					<p className="text-xs font-medium text-ink/70">از ۲٬۰۰۰ نظر مشتریان</p>
				</div>
				<span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest text-cream font-extrabold">
					۴٫۹
				</span>
			</motion.div>

			<motion.div
				{...float(10, 6, 0.8)}
				className="absolute -left-6 md:-left-10 top-[62%] flex h-28 w-28 md:h-36 md:w-36 flex-col items-center justify-center rounded-full border-[3px] border-camel bg-forest-dark text-center shadow-2xl"
			>
				<span className="text-[11px] md:text-xs text-cream/80">ضمانت اصالت</span>
				<span className="text-2xl md:text-4xl font-black leading-tight text-camel">۱۰۰٪</span>
				<span className="text-[11px] md:text-xs text-cream/80">دوخت ایرانی</span>
			</motion.div>

			<motion.div
				{...float(7, 5.5, 1.6)}
				className="absolute -bottom-4 right-4 flex items-center gap-3 rounded-2xl bg-cream/95 px-4 py-3 shadow-xl"
			>
				<div className="text-right">
					<p className="text-sm font-bold text-forest">کیف چرم دست‌دوز</p>
					<p className="text-xs font-medium text-ink/65">۱٬۲۰۰٬۰۰۰ تومان</p>
				</div>
				<span className="flex h-11 w-11 items-center justify-center rounded-full bg-camel/25 text-forest">
					<ArrowLeft size={18} />
				</span>
			</motion.div>
		</motion.div>
	);
}

export default function Hero() {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-forest to-forest-dark">
			<motion.div
				aria-hidden="true"
				className="pointer-events-none absolute -top-56 -left-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(212,169,78,0.28),transparent_70%)]"
				animate={{ scale: [1, 1.08, 1] }}
				transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -bottom-72 -right-24 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(21,154,115,0.45),transparent_70%)]"
			/>
			<WeavePattern />

			<motion.div
				variants={stagger(0.12)}
				initial="hidden"
				animate="show"
				className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center"
			>
				<div>
					<motion.div
						variants={fadeUp}
						className="inline-flex items-center gap-2.5 rounded-full border border-camel/45 bg-camel/10 px-4 py-2 mb-7"
					>
						<span className="h-2 w-2 rounded-full bg-camel animate-pulse" />
						<span className="text-camel-light text-sm font-semibold">
							دوخت دست، طراحی ایرانی
						</span>
					</motion.div>

					<motion.h1
						variants={fadeUp}
						className="text-5xl md:text-7xl font-extrabold text-cream leading-[1.35] mb-6"
					>
						پوشاکی برای
						<br />
						<span className="relative inline-block text-camel">
							سبک زندگی شما
							<motion.span
								aria-hidden="true"
								className="absolute right-0 -bottom-1 h-2 w-full origin-right rounded-full bg-gradient-to-l from-rust to-transparent"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
							/>
						</span>
					</motion.h1>

					<motion.p
						variants={fadeUp}
						className="text-cream/75 text-lg leading-8 mb-10 max-w-md"
					>
						از پیراهن‌های کتان تا کیف و کفش چرم دست‌دوز؛ کیفیتی که با هر بار پوشیدن حس می‌کنید.
					</motion.p>

					<motion.div variants={fadeUp} className="flex flex-wrap gap-4">
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
							<Link
								to="/#products"
								className="inline-block bg-camel hover:bg-camel-light text-forest font-bold px-8 py-4 rounded-full shadow-[0_10px_28px_rgba(212,169,78,0.45)] transition-colors"
							>
								مشاهده کالکشن
							</Link>
						</motion.div>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
							<Link
								to="/#story"
								className="inline-block border-[1.5px] border-cream/35 hover:border-camel hover:bg-cream/5 text-cream font-medium px-8 py-4 rounded-full transition-colors"
							>
								داستان برند
							</Link>
						</motion.div>
					</motion.div>

					<motion.dl
						variants={fadeUp}
						className="mt-12 flex flex-wrap items-center gap-x-9 gap-y-5"
					>
						{STATS.map((stat, index) => (
							<div key={stat.label} className="flex items-center gap-9">
								<div>
									<dt className="sr-only">{stat.label}</dt>
									<dd className="text-3xl font-extrabold text-camel leading-tight">
										{stat.value}
									</dd>
									<p aria-hidden="true" className="text-sm text-cream/60">
										{stat.label}
									</p>
								</div>
								{index < STATS.length - 1 && (
									<span aria-hidden="true" className="hidden sm:block h-11 w-px bg-cream/20" />
								)}
							</div>
						))}
					</motion.dl>
				</div>

				<HeroVisual />
			</motion.div>
		</section>
	);
}
