import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const MAX_WAIT_MS = 3000;
const SETTLE_CHECKS = 3;
const HEADER_OFFSET = 96;

function scrollToHash(hash, isCancelled) {
	const startedAt = performance.now();
	let frame = 0;
	let timer = 0;

	function align(remainingChecks) {
		if (isCancelled()) return;
		const element = document.querySelector(hash);
		if (!element) return;

		element.scrollIntoView({ behavior: "smooth", block: "start" });

		if (remainingChecks > 0) {
			timer = window.setTimeout(() => {
				const distance = Math.abs(element.getBoundingClientRect().top - HEADER_OFFSET);
				if (distance > 24) align(remainingChecks - 1);
			}, 750);
		}
	}

	function waitForTarget() {
		if (isCancelled()) return;
		if (document.querySelector(hash)) {
			align(SETTLE_CHECKS);
		} else if (performance.now() - startedAt < MAX_WAIT_MS) {
			frame = requestAnimationFrame(waitForTarget);
		}
	}

	waitForTarget();

	return () => {
		cancelAnimationFrame(frame);
		clearTimeout(timer);
	};
}

const POSITIONS_KEY = "nemonekar_scroll_positions";

function readPositions() {
	try {
		return JSON.parse(sessionStorage.getItem(POSITIONS_KEY)) ?? {};
	} catch {
		return {};
	}
}

function savePosition(key, position) {
	try {
		const positions = readPositions();
		positions[key] = position;
		sessionStorage.setItem(POSITIONS_KEY, JSON.stringify(positions));
	} catch {
		return;
	}
}

export default function ScrollManager() {
	const { pathname, hash, key } = useLocation();
	const navigationType = useNavigationType();
	const hashKey = hash ? key : null;

	useEffect(() => {
		let timer = 0;
		const onScroll = () => {
			clearTimeout(timer);
			timer = window.setTimeout(() => savePosition(key, window.scrollY), 150);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			clearTimeout(timer);
			window.removeEventListener("scroll", onScroll);
		};
	}, [key]);

	useEffect(() => {
		if (!hash) {
			const saved = navigationType === "POP" ? readPositions()[key] : undefined;
			const frame = requestAnimationFrame(() =>
				window.scrollTo({ top: saved ?? 0, behavior: "instant" }),
			);
			return () => cancelAnimationFrame(frame);
		}

		let cancelled = false;
		const cleanup = scrollToHash(hash, () => cancelled);
		return () => {
			cancelled = true;
			cleanup();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, hash, hashKey]);

	return null;
}
