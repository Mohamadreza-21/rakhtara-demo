import { readStoredDb, writeStoredDb } from "./storage";
import { runQuery } from "./query";
import { withBase } from "../utils/assets";

let dbPromise = null;

function prefixAssets(value) {
	if (typeof value === "string") return value.startsWith("/images/") ? withBase(value) : value;
	if (Array.isArray(value)) return value.map(prefixAssets);
	if (value && typeof value === "object") {
		return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, prefixAssets(inner)]));
	}
	return value;
}

function loadDb() {
	dbPromise ??= (async () => {
		const stored = readStoredDb();
		if (stored) return stored;
		const { default: seed } = await import("./db.json");
		const db = prefixAssets(structuredClone(seed));
		writeStoredDb(db);
		return db;
	})();
	return dbPromise;
}

function createId() {
	const bytes = crypto.getRandomValues(new Uint8Array(6));
	return Array.from(bytes, (byte) => byte.toString(36).padStart(2, "0")).join("").slice(0, 8);
}

const clone = (value) => structuredClone(value);
const respond = (status, data) => ({ status, data: data === undefined ? undefined : clone(data) });
const notFound = () => respond(404, {});

export async function handleRequest({ method, path, params, body }) {
	const db = await loadDb();
	const [resource, id] = path.split("/").filter(Boolean);
	const table = db[resource];

	if (table === undefined) return notFound();

	if (!Array.isArray(table)) {
		if (method === "get") return respond(200, table);
		if (method === "patch" || method === "put") {
			db[resource] = method === "put" ? body : { ...table, ...body };
			writeStoredDb(db);
			return respond(200, db[resource]);
		}
		return respond(405, {});
	}

	if (id === undefined) {
		if (method === "get") return respond(200, runQuery(table, params));
		if (method === "post") {
			const item = { ...body, id: body?.id ?? createId() };
			table.push(item);
			writeStoredDb(db);
			return respond(201, item);
		}
		return respond(405, {});
	}

	const index = table.findIndex((item) => String(item.id) === String(id));
	if (index === -1) return notFound();

	if (method === "get") return respond(200, table[index]);

	if (method === "patch" || method === "put") {
		table[index] = method === "put" ? { ...body, id: table[index].id } : { ...table[index], ...body, id: table[index].id };
		writeStoredDb(db);
		return respond(200, table[index]);
	}

	if (method === "delete") {
		const [removed] = table.splice(index, 1);
		writeStoredDb(db);
		return respond(200, removed);
	}

	return respond(405, {});
}
