import {
  getData,
  saveData,
  STORAGE_KEYS,
} from "./storageService";

// ===== BASIC CRUD =====
export function getCart() {
  return getData(STORAGE_KEYS.CART);
}

export function saveCart(cart) {
  saveData(STORAGE_KEYS.CART, cart);
}

// ===== CART LOGIC =====
export function addToCart(cart, product) {
  const existing = cart.find(
    (item) => item.id === product.id
  );

  if (existing) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, qty: item.qty + 1 }
        : item
    );
  }

  return [...cart, { ...product, qty: 1 }];
}

export function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

export function updateCartQty(cart, id, qty) {
  return cart.map((item) =>
    item.id === id ? { ...item, qty } : item
  );
}

export function clearCart() {
  saveCart([]);
}

// ===== SUMMARY =====
export function getCartSummary(cart) {
  return {
    totalItems: cart.reduce(
      (acc, item) => acc + item.qty,
      0
    ),

    totalPrice: cart.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    ),
  };
}