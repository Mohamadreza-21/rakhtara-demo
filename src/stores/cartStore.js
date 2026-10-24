import { create } from "zustand";
import {
	getCartItems,
	createCartItem,
	updateCartItem,
	deleteCartItem,
} from "../services/cart";
import { getProduct } from "../services/products";

const GUEST_ID_KEY = "nemonekar_cart_guest_id";

export function getGuestId() {
	try {
		let id = localStorage.getItem(GUEST_ID_KEY);
		if (!id) {
			id = `guest-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
			localStorage.setItem(GUEST_ID_KEY, id);
		}
		return id;
	} catch {
		return `guest-${Date.now()}`;
	}
}

function fromRow(row) {
	return {
		id: row.productId,
		rowId: row.id,
		name: row.name,
		price: row.price,
		image: row.image,
		gradient: row.gradient,
		size: row.size,
		stock: row.stock,
		qty: row.qty,
		cartKey: row.cartKey,
	};
}

let loadToken = 0;

async function resolveStock(productId, fallback) {
	try {
		const product = await getProduct(productId);
		return typeof product.stock === "number" ? product.stock : undefined;
	} catch {
		return typeof fallback === "number" ? fallback : undefined;
	}
}

function stockFailure(stock) {
	return { ok: false, reason: stock <= 0 ? "soldout" : "stock", max: Math.max(0, stock) };
}

export const useCartStore = create((set, get) => ({
	items: [],
	ownerId: null,

	load: async (ownerId) => {
		const token = ++loadToken;
		set({ ownerId, items: [] });
		try {
			const rows = await getCartItems(ownerId);
			if (token === loadToken) set({ items: rows.map(fromRow) });
		} catch (error) {
			if (token === loadToken) set({ items: [] });
			console.error("بارگذاری سبد خرید با خطا مواجه شد:", error);
		}
	},

	add: async (product, qty = 1, size = null) => {
		const { items, ownerId } = get();
		const cartKey = size ? `${product.id}-${size}` : `${product.id}`;
		const existing = items.find((item) => item.cartKey === cartKey);
		const nextQty = (existing?.qty ?? 0) + qty;

		const stock = await resolveStock(product.id, product.stock);
		if (stock !== undefined && nextQty > stock) return stockFailure(stock);

		try {
			if (existing) {
				await updateCartItem(existing.rowId, { qty: nextQty, stock });
				set((state) => ({
					items: state.items.map((item) =>
						item.cartKey === cartKey ? { ...item, qty: nextQty, stock } : item,
					),
				}));
			} else {
				const row = await createCartItem({
					ownerId,
					productId: product.id,
					name: product.name,
					price: product.price,
					image: product.image,
					gradient: product.gradient,
					size,
					stock,
					qty,
					cartKey,
				});
				set((state) => ({ items: [...state.items, fromRow(row)] }));
			}
			return { ok: true };
		} catch (error) {
			console.error("افزودن به سبد خرید با خطا مواجه شد:", error);
			return { ok: false, reason: "error" };
		}
	},

	changeQty: async (cartKey, delta) => {
		const item = get().items.find((cartItem) => cartItem.cartKey === cartKey);
		if (!item) return { ok: true };
		const nextQty = item.qty + delta;

		let stock = item.stock;
		if (delta > 0) {
			stock = await resolveStock(item.id, item.stock);
			if (stock !== undefined && nextQty > stock) return stockFailure(stock);
		}

		try {
			if (nextQty <= 0) {
				await deleteCartItem(item.rowId);
				set((state) => ({ items: state.items.filter((cartItem) => cartItem.cartKey !== cartKey) }));
				return { ok: true, removed: item };
			} else {
				await updateCartItem(item.rowId, { qty: nextQty, stock });
				set((state) => ({
					items: state.items.map((cartItem) =>
						cartItem.cartKey === cartKey ? { ...cartItem, qty: nextQty, stock } : cartItem,
					),
				}));
			}
			return { ok: true };
		} catch (error) {
			console.error("بروزرسانی سبد خرید با خطا مواجه شد:", error);
			return { ok: false, reason: "error" };
		}
	},

	remove: async (cartKey) => {
		const item = get().items.find((cartItem) => cartItem.cartKey === cartKey);
		if (!item) return { ok: true };
		try {
			await deleteCartItem(item.rowId);
			set((state) => ({ items: state.items.filter((cartItem) => cartItem.cartKey !== cartKey) }));
			return { ok: true, item };
		} catch (error) {
			console.error("حذف از سبد خرید با خطا مواجه شد:", error);
			return { ok: false, reason: "error" };
		}
	},
}));

export const selectCartCount = (state) =>
	state.items.reduce((sum, item) => sum + item.qty, 0);
export const selectCartTotal = (state) =>
	state.items.reduce((sum, item) => sum + item.qty * item.price, 0);
