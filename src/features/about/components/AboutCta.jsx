import { Link } from "react-router-dom";

export default function AboutCta() {
	return (
		<section className="max-w-7xl mx-auto px-6 pb-24">
			<div className="bg-forest-dark rounded-[2rem] px-8 py-14 text-center">
				<h2 className="text-2xl md:text-3xl font-extrabold text-cream mb-4">
					سوالی درباره محصولات یا سفارشتان دارید؟
				</h2>
				<p className="text-cream/70 mb-8 max-w-xl mx-auto">
					تیم رخت‌آرا آماده پاسخ‌گویی به شماست؛ همین حالا با ما در ارتباط
					باشید.
				</p>
				<Link
					to="/contact-us"
					className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-full bg-camel hover:bg-camel-light text-forest-dark transition-transform hover:scale-[1.02] shadow-lg"
				>
					تماس با ما
				</Link>
			</div>
		</section>
	);
}
