export const keys = {
	products: {
		all: ["products"],
		list: ["products", "list"],
		detail: (id) => ["products", "detail", String(id)],
		featured: (count) => ["products", "featured", count],
		related: (id) => ["products", "related", String(id)],
		recent: ["products", "recent"],
		counts: ["products", "counts"],
	},
	users: {
		all: ["users"],
		list: ["users", "list"],
		recent: ["users", "recent"],
	},
	comments: {
		all: ["comments"],
		list: ["comments", "list"],
		ofProduct: (id) => ["comments", "product", String(id)],
		top: ["comments", "top"],
	},
	messages: {
		all: ["messages"],
		list: ["messages", "list"],
		mine: ["messages", "mine"],
	},
	contactInfo: ["contactInfo"],
	showcase: ["showcase"],
	stats: {
		all: ["stats"],
		products: ["stats", "products"],
		users: ["stats", "users"],
		comments: ["stats", "comments"],
		dashboard: ["stats", "dashboard"],
		chart: ["stats", "chart"],
	},
};
