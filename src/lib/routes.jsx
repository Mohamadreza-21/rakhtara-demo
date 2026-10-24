import { createBrowserRouter, redirect } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import CMSLayout from "../components/layouts/CMSLayout";
import PageLoader from "../components/shared/PageLoader";
import {
	HomePageSkeleton,
	ProductsPageSkeleton,
	AboutPageSkeleton,
	ContactPageSkeleton,
	AccountPageSkeleton,
	AuthPageSkeleton,
} from "../components/skeletons/SiteSkeletons";
import ProductDetailSkeleton from "../features/storefront/components/ProductDetailSkeleton";
import {
	DashboardSkeleton,
	UsersPageSkeleton,
	CmsProductsPageSkeleton,
	CommentsPageSkeleton,
} from "../components/skeletons/CmsSkeletons";
import RootError from "../components/errors/routes/RootError";
import HomeError from "../components/errors/routes/HomeError";
import ProductsError from "../components/errors/routes/ProductsError";
import AboutError from "../components/errors/routes/AboutError";
import ContactError from "../components/errors/routes/ContactError";
import ProductDetailError from "../components/errors/routes/ProductDetailError";
import CategoryError from "../components/errors/routes/CategoryError";
import AccountError from "../components/errors/routes/AccountError";
import AuthError from "../components/errors/routes/AuthError";
import DashboardHomeError from "../components/errors/routes/DashboardHomeError";
import UsersError from "../components/errors/routes/UsersError";
import CmsProductsError from "../components/errors/routes/CmsProductsError";
import CommentsError from "../components/errors/routes/CommentsError";
import SiteNotFound from "../components/errors/notfound/SiteNotFound";
import ProductsNotFound from "../components/errors/notfound/ProductsNotFound";
import AboutNotFound from "../components/errors/notfound/AboutNotFound";
import ContactNotFound from "../components/errors/notfound/ContactNotFound";
import AccountNotFound from "../components/errors/notfound/AccountNotFound";
import DashboardHomeNotFound from "../components/errors/notfound/DashboardHomeNotFound";
import UsersNotFound from "../components/errors/notfound/UsersNotFound";
import CmsProductsNotFound from "../components/errors/notfound/CmsProductsNotFound";
import CommentsNotFound from "../components/errors/notfound/CommentsNotFound";
import DashboardNotFound from "../components/errors/notfound/DashboardNotFound";
import Forbidden from "../pages/Forbidden";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import { ROLES } from "./roles";
import RootLayout from "../components/layouts/RootLayout";
import { withSkeleton } from "./withSkeleton";
import {
	HomePage,
	AllProductsPage,
	AboutUSPage,
	ContactUSPage,
	ProductDetailPage,
	CategoryPage,
	AccountPage,
	AuthPage,
	Dashboard,
	Users,
	Products,
	CmsComments,
} from "./lazyPages";

export const router = createBrowserRouter(
	[
	{
		element: <RootLayout />,
		errorElement: <RootError />,
		hydrateFallbackElement: <PageLoader fullScreen label="در حال آماده‌سازی" />,
		children: [
			{
				path: "/",
				element: <AppLayout />,
				children: [
					{
						index: true,
						element: withSkeleton(HomePage, HomePageSkeleton),
						errorElement: <HomeError />,
					},
					{
						path: "products",
						element: withSkeleton(AllProductsPage, ProductsPageSkeleton),
						errorElement: <ProductsError />,
					},
					{
						path: "about-us",
						element: withSkeleton(AboutUSPage, AboutPageSkeleton),
						errorElement: <AboutError />,
					},
					{
						path: "contact-us",
						element: withSkeleton(ContactUSPage, ContactPageSkeleton),
						errorElement: <ContactError />,
					},
					{
						path: "product/:id",
						element: withSkeleton(ProductDetailPage, ProductDetailSkeleton),
						errorElement: <ProductDetailError />,
					},
					{
						path: "category/:id",
						element: withSkeleton(CategoryPage, ProductsPageSkeleton),
						errorElement: <CategoryError />,
					},
					{
						path: "account",
						element: <ProtectedRoute role={ROLES.USER}>{withSkeleton(AccountPage, AccountPageSkeleton)}</ProtectedRoute>,
						errorElement: <AccountError />,
					},
					{ path: "products/*", element: <ProductsNotFound route /> },
					{ path: "about-us/*", element: <AboutNotFound /> },
					{ path: "contact-us/*", element: <ContactNotFound /> },
					{ path: "account/*", element: <AccountNotFound /> },
					{ path: "403", element: <Forbidden /> },
					{ path: "*", element: <SiteNotFound /> },
				],
			},
			{
				path: "/login",
				element: withSkeleton(AuthPage, AuthPageSkeleton),
				errorElement: <AuthError />,
			},
			{
				path: "/admin",
				element: (
					<ProtectedRoute role={ROLES.ADMIN}>
						<CMSLayout />
					</ProtectedRoute>
				),
				children: [
					{ index: true, loader: () => redirect("/admin/home") },
					{
						path: "home",
						element: withSkeleton(Dashboard, DashboardSkeleton),
						errorElement: <DashboardHomeError />,
					},
					{
						path: "users",
						element: withSkeleton(Users, UsersPageSkeleton),
						errorElement: <UsersError />,
					},
					{
						path: "products",
						element: withSkeleton(Products, CmsProductsPageSkeleton),
						errorElement: <CmsProductsError />,
					},
					{
						path: "comments",
						element: withSkeleton(CmsComments, CommentsPageSkeleton),
						errorElement: <CommentsError />,
					},
					{ path: "home/*", element: <DashboardHomeNotFound /> },
					{ path: "users/*", element: <UsersNotFound route /> },
					{ path: "products/*", element: <CmsProductsNotFound route /> },
					{ path: "comments/*", element: <CommentsNotFound route /> },
					{ path: "*", element: <DashboardNotFound /> },
				],
			},
		],
	},
],
	{ basename: import.meta.env.BASE_URL },
);
