import { Fragment } from "react";
import { useOutletContext } from "react-router-dom";
import LazyMount from "../components/shared/LazyMount";
import Hero from "../features/storefront/components/Hero";
import ImageShowcase from "../features/storefront/components/ImageShowcase";
import TrustBadges from "../features/storefront/components/TrustBadges";
import Categories from "../features/storefront/components/Categories";
import ProductsSection from "../features/storefront/components/ProductsSection";
import StorySection from "../features/storefront/components/StorySection";
import TestimonialsSection from "../features/storefront/components/TestimonialsSection";
import FaqSection from "../features/storefront/components/FaqSection";
import Newsletter from "../features/storefront/components/Newsletter";

function ThreadDivider() {
	return <div className="thread-divider max-w-7xl mx-auto" />;
}

const SECTIONS = [
	{ key: "hero", Component: Hero },
	{ key: "showcase", Component: ImageShowcase },
	{ key: "trust", Component: TrustBadges },
	{ key: "categories", Component: Categories },
	{ key: "divider", Component: ThreadDivider },
	{ key: "products", Component: ProductsSection, withCart: true },
	{ key: "story", Component: StorySection, lazy: { id: "story", minHeight: 520 } },
	{ key: "reviews", Component: TestimonialsSection, lazy: { id: "reviews", minHeight: 480 } },
	{ key: "faq", Component: FaqSection, lazy: { id: "faq", minHeight: 520 } },
	{ key: "newsletter", Component: Newsletter, lazy: { minHeight: 280 } },
];

export default function HomePage() {
	const { addToCart } = useOutletContext();

	return SECTIONS.map(({ key, Component, lazy, withCart }) => {
		const section = withCart ? <Component onAdd={addToCart} /> : <Component />;
		return lazy ? (
			<LazyMount key={key} {...lazy}>
				{section}
			</LazyMount>
		) : (
			<Fragment key={key}>{section}</Fragment>
		);
	});
}
