const SESSION_KEY = "nemonekar-session";

export function readSession() {
	try {
		const raw = window.sessionStorage.getItem(SESSION_KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}

export function writeSession(user) {
	try {
		if (user) window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
		else window.sessionStorage.removeItem(SESSION_KEY);
	} catch {
		return;
	}
}
