const RESERVED = new Set(["_page", "_per_page", "_sort"]);

const OPERATORS = {
	lt: (value, target) => Number(value) < Number(target),
	lte: (value, target) => Number(value) <= Number(target),
	gt: (value, target) => Number(value) > Number(target),
	gte: (value, target) => Number(value) >= Number(target),
	ne: (value, target) => String(value) !== String(target),
	in: (value, target) => String(target).split(",").includes(String(value)),
	contains: (value, target) => String(value ?? "").toLowerCase().includes(String(target).toLowerCase()),
	startsWith: (value, target) => String(value ?? "").toLowerCase().startsWith(String(target).toLowerCase()),
	endsWith: (value, target) => String(value ?? "").toLowerCase().endsWith(String(target).toLowerCase()),
};

function matches(item, key, target) {
	const [field, operator] = key.split(":");
	if (!operator) return String(item[field]) === String(target);
	const test = OPERATORS[operator];
	return test ? test(item[field], target) : true;
}

function compare(a, b) {
	if (a === b) return 0;
	if (a === undefined || a === null) return 1;
	if (b === undefined || b === null) return -1;
	if (typeof a === "number" && typeof b === "number") return a - b;
	return String(a).localeCompare(String(b), "fa");
}

function sortItems(items, sort) {
	const rules = sort.split(",").filter(Boolean).map((rule) => ({
		field: rule.replace(/^-/, ""),
		direction: rule.startsWith("-") ? -1 : 1,
	}));
	return [...items].sort((left, right) => {
		for (const { field, direction } of rules) {
			const result = compare(left[field], right[field]);
			if (result !== 0) return result * direction;
		}
		return 0;
	});
}

export function runQuery(collection, params = {}) {
	let items = collection.filter((item) =>
		Object.entries(params).every(([key, target]) => RESERVED.has(key) || matches(item, key, target)),
	);

	if (params._sort) items = sortItems(items, String(params._sort));

	if (params._page === undefined && params._per_page === undefined) return items;

	const perPage = Math.max(1, Number(params._per_page) || 10);
	const total = items.length;
	const pages = Math.max(1, Math.ceil(total / perPage));
	const page = Math.min(Math.max(1, Number(params._page) || 1), pages);
	const start = (page - 1) * perPage;

	return {
		first: 1,
		prev: page > 1 ? page - 1 : null,
		next: page < pages ? page + 1 : null,
		last: pages,
		pages,
		items: total,
		data: items.slice(start, start + perPage),
	};
}
