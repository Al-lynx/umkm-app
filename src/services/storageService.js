// src/services/storageService.js

const KEYS = {
  PRODUCTS: "products",
  CART: "cart",
  TRANSACTIONS: "transactions",
};

// ===== GENERIC STORAGE =====
export function getData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ===== PRODUCTS =====
export function getProducts() {
  return getData(KEYS.PRODUCTS);
}

export function saveProducts(data) {
  saveData(KEYS.PRODUCTS, data);
}

// ===== CART =====
export function getCart() {
  return getData(KEYS.CART);
}

export function saveCart(data) {
  saveData(KEYS.CART, data);
}

export function clearCart() {
  saveCart([]);
}

// ===== TRANSACTIONS =====
export function getTransactions() {
  return getData(KEYS.TRANSACTIONS);
}

export function saveTransactions(data) {
  saveData(KEYS.TRANSACTIONS, data);
}

// ===== STOCK UPDATE =====
export function updateProductStock(cartItems) {
  const products = getProducts();

  const updated = products.map((p) => {
    const cartItem = cartItems.find((c) => c.id === p.id);

    if (!cartItem) return p;

    return {
      ...p,
      stock: p.stock - cartItem.qty,
    };
  });

  saveProducts(updated);
}

// ===== EXPORT KEYS (INI YANG SEBELUMNYA ERROR) =====
export const STORAGE_KEYS = KEYS;