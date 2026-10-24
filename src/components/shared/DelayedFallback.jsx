import { useEffect, useState } from "react";

export default function DelayedFallback({ children, delay = 180 }) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setShow(true), delay);
		return () => clearTimeout(timer);
	}, [delay]);

	return show ? children : null;
}
