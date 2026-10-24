export const EASE = [0.16, 1, 0.3, 1];

export const fadeUp = {
	hidden: { opacity: 0, y: 18 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const scaleIn = {
	hidden: { opacity: 0, scale: 0.92 },
	show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

export const stagger = (delay = 0.07, delayChildren = 0) => ({
	hidden: {},
	show: { transition: { staggerChildren: delay, delayChildren } },
});

export const routeVariants = {
	site: {
		initial: { opacity: 0, y: 22, scale: 0.985 },
		animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
		exit: { opacity: 0, y: -10, scale: 0.99, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } },
	},
	cms: {
		initial: { opacity: 0, x: 28, scale: 0.97 },
		animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
		exit: { opacity: 0, x: -18, scale: 0.98, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
	},
};
