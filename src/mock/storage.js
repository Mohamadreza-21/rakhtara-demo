const VERSION = 1;
const KEY = `rakhtara-db:${import.meta.env.BASE_URL}:v${VERSION}`;

export function readStoredDb() {
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}

export function writeStoredDb(db) {
	try {
		localStorage.setItem(KEY, JSON.stringify(db));
	} catch {
		return;
	}
}

export function clearStoredDb() {
	try {
		localStorage.removeItem(KEY);
	} catch {
		return;
	}
}
