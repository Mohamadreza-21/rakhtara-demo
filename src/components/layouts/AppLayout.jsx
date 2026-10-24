import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "../../features/storefront/components/Header";
import Footer from "../../features/storefront/components/Footer";
import CartDrawer from "../../features/storefront/components/CartDrawer";
import { toast } from "sonner";
import AppToaster from "../shared/AppToaster";
import TopLoadingBar from "../shared/TopLoadingBar";
import RouteTransition from "../shared/RouteTransition";
import { useAuth } from "../../context/useAuth";
import {
	useCartStore,
	selectCartCount,
	selectCartTotal,
	getGuestId,
} from "../../stores/cartStore";

function stockMessage(result) {
	if (result.reason === "soldout") return "این محصول ناموجود است";
	if (result.reason === "stock") {
		return `حداکثر موجودی این محصول ${result.max.toLocaleString("fa-IR")} عدد است`;
	}
	return null;
}

const MainOutlet = memo(function MainOutlet({ outletContext }) {
	return (
		<main id="main-content" tabIndex={-1} className="outline-none">
			<RouteTransition outletContext={outletContext} />
		</main>
	);
});

function AppLayout() {
	const { user, isAuthenticated } = useAuth();
	const ownerId = user?.id || getGuestId();
	const navigate = useNavigate();
	const location = useLocation();

	const [menuOpen, setMenuOpen] = useState(false);
	const [cartOpen, setCartOpen] = useState(false);
	const bumpTimeout = useRef(null);
	const [bump, setBump] = useState(false);

	const cart = useCartStore((state) => state.items);
	const cartCount = useCartStore(selectCartCount);
	const cartTotal = useCartStore(selectCartTotal);

	useEffect(() => {
		useCartStore.getState().load(ownerId);
	}, [ownerId]);

	useEffect(() => () => clearTimeout(bumpTimeout.current), []);

	const addToCart = useCallback(
		async (product, qty = 1, size = null) => {
			if (!isAuthenticated) {
				toast("برای افزودن به سبد خرید ابتدا وارد حساب کاربری خود شوید");
				navigate("/login", {
					state: { tab: "login", from: location.pathname },
				});
				return false;
			}

			const result = await useCartStore.getState().add(product, qty, size);

			if (!result.ok) {
				toast.error(stockMessage(result) ?? "افزودن به سبد خرید با خطا مواجه شد");
				return false;
			}

			setBump(true);
			clearTimeout(bumpTimeout.current);
			bumpTimeout.current = setTimeout(() => setBump(false), 300);
			toast.success(`${product.name} به سبد خرید اضافه شد`, {
				description: size ? `سایز: ${size}` : undefined,
			});
			return true;
		},
		[isAuthenticated, navigate, location.pathname],
	);

	const changeQty = useCallback(async (cartKey, delta) => {
		const result = await useCartStore.getState().changeQty(cartKey, delta);
		if (!result.ok) {
			toast.error(stockMessage(result) ?? "بروزرسانی سبد خرید با خطا مواجه شد");
		} else if (result.removed) {
			toast.error(`${result.removed.name} از سبد خرید حذف شد`);
		}
	}, []);

	const removeItem = useCallback(async (cartKey) => {
		const result = await useCartStore.getState().remove(cartKey);
		if (!result.ok) {
			toast.error("حذف از سبد خرید با خطا مواجه شد");
		} else if (result.item) {
			toast.error(`${result.item.name} از سبد خرید حذف شد`);
		}
	}, []);

	const outletContext = useMemo(() => ({ addToCart }), [addToCart]);

	const openCart = useCallback(() => setCartOpen(true), []);
	const closeCart = useCallback(() => setCartOpen(false), []);

	return (
		<>
			<TopLoadingBar />
			<AppToaster />
			<div
				dir="rtl"
				className="min-h-screen antialiased font-vazir bg-cream text-ink"
			>
				<Header
					cartCount={cartCount}
					bump={bump}
					menuOpen={menuOpen}
					setMenuOpen={setMenuOpen}
					onCartClick={openCart}
				/>

				<MainOutlet outletContext={outletContext} />

				<Footer />

				<AnimatePresence>
					{cartOpen && (
						<CartDrawer
							key="cart-drawer"
							cart={cart}
							cartTotal={cartTotal}
							onClose={closeCart}
							changeQty={changeQty}
							removeItem={removeItem}
						/>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}

export default AppLayout;
