const BASE_URL = import.meta.env.BASE_URL || "/";
const BASE_PREFIX = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;

/**
 * Resolve a public asset against Vite's configured base path.
 * Also handles paths saved by an earlier deployment, such as
 * `/old-repository/images/product.svg`.
 */
export function withBase(path) {
	const value = String(path ?? "").trim();
	if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return value;

	const normalized = value.replace(/\\/g, "/");
	const imageMarker = "/images/";
	const markerIndex = normalized.indexOf(imageMarker);
	const relativePath = markerIndex >= 0
		? normalized.slice(markerIndex + 1)
		: normalized.replace(/^\/+/, "");

	return `${BASE_PREFIX}${relativePath}`;
}
