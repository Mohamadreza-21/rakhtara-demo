const SALT = "rakhtara:";

export async function hashPassword(password) {
	const bytes = new TextEncoder().encode(SALT + password);
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
