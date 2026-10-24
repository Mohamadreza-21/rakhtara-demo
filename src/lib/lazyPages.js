import { lazy } from "react";

const loaders = {
	HomePage: () => import("../pages/HomePage"),
	AllProductsPage: () => import("../pages/AllProductsPage"),
	AboutUSPage: () => import("../pages/AboutUSPage"),
	ContactUSPage: () => import("../pages/ContactUSPage"),
	ProductDetailPage: () => import("../pages/ProductDetailPage"),
	CategoryPage: () => import("../pages/CategoryPage"),
	AccountPage: () => import("../pages/AccountPage"),
	AuthPage: () => import("../pages/AuthPage"),
	Dashboard: () => import("../pages/Dashboard"),
	Users: () => import("../pages/Users"),
	Products: () => import("../pages/Products"),
	CmsComments: () => import("../pages/CmsComments"),
};

const STOREFRONT_PAGES = [
	"HomePage",
	"AllProductsPage",
	"AboutUSPage",
	"ContactUSPage",
	"ProductDetailPage",
	"CategoryPage",
	"AccountPage",
	"AuthPage",
];

const CMS_PAGES = ["Dashboard", "Users", "Products", "CmsComments"];

const PATH_TO_PAGE = [
	[/^\/products\/?$/, "AllProductsPage"],
	[/^\/about-us\/?$/, "AboutUSPage"],
	[/^\/contact-us\/?$/, "ContactUSPage"],
	[/^\/product\//, "ProductDetailPage"],
	[/^\/category\//, "CategoryPage"],
	[/^\/account\/?$/, "AccountPage"],
	[/^\/login\/?$/, "AuthPage"],
	[/^\/admin\/home\/?$/, "Dashboard"],
	[/^\/admin\/users\/?$/, "Users"],
	[/^\/admin\/products\/?$/, "Products"],
	[/^\/admin\/comments\/?$/, "CmsComments"],
	[/^\/$/, "HomePage"],
];

const pending = new Map();

function load(name) {
	if (!pending.has(name)) {
		pending.set(
			name,
			loaders[name]().catch((error) => {
				pending.delete(name);
				throw error;
			}),
		);
	}
	return pending.get(name);
}

function preloadPage(name) {
	if (loaders[name]) load(name).catch(() => {});
}

export function preloadRoute(path) {
	const pathname = String(path).split(/[?#]/)[0] || "/";
	const match = PATH_TO_PAGE.find(([pattern]) => pattern.test(pathname));
	if (match) preloadPage(match[1]);
}

function runWhenIdle(task) {
	if (typeof requestIdleCallback === "function") {
		requestIdleCallback(task, { timeout: 4000 });
	} else {
		setTimeout(task, 1500);
	}
}

export function preloadPagesWhenIdle({ cms = false } = {}) {
	runWhenIdle(() => {
		STOREFRONT_PAGES.forEach(preloadPage);
		if (cms) CMS_PAGES.forEach(preloadPage);
	});
}

export const HomePage = lazy(() => load("HomePage"));
export const AllProductsPage = lazy(() => load("AllProductsPage"));
export const AboutUSPage = lazy(() => load("AboutUSPage"));
export const ContactUSPage = lazy(() => load("ContactUSPage"));
export const ProductDetailPage = lazy(() => load("ProductDetailPage"));
export const CategoryPage = lazy(() => load("CategoryPage"));
export const AccountPage = lazy(() => load("AccountPage"));
export const AuthPage = lazy(() => load("AuthPage"));
export const Dashboard = lazy(() => load("Dashboard"));
export const Users = lazy(() => load("Users"));
export const Products = lazy(() => load("Products"));
export const CmsComments = lazy(() => load("CmsComments"));
