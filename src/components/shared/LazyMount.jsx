import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "../../lib/motion";
import { Skeleton } from "./Skeleton";

export default function LazyMount({ children, minHeight = 400, id }) {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (visible || !ref.current) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "250px" },
		);
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [visible]);

	return (
		<div id={id} ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
			{visible ? (
				<motion.div
					initial={{ opacity: 0, y: 28 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9, ease: EASE }}
				>
					{children}
				</motion.div>
			) : (
				<div className="max-w-7xl mx-auto px-6 py-16" style={{ minHeight }}>
					<Skeleton className="h-8 w-56 rounded mx-auto mb-4" />
					<Skeleton className="h-4 w-80 max-w-full rounded mx-auto mb-12" />
					<div className="grid md:grid-cols-3 gap-8">
						{Array.from({ length: 3 }).map((_, index) => (
							<Skeleton key={index} delay={index * 0.1} className="h-48 rounded-3xl" />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
