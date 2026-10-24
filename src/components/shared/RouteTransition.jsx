import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";
import { routeVariants } from "../../lib/motion";

export default function RouteTransition({ outletContext, variant = "site" }) {
	const location = useLocation();
	const outlet = useOutlet(outletContext);
	const variants = routeVariants[variant] || routeVariants.site;

	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div
				key={location.pathname}
				variants={variants}
				initial="initial"
				animate="animate"
				exit="exit"
				style={{ transformOrigin: "top center" }}
			>
				{outlet}
			</motion.div>
		</AnimatePresence>
	);
}
