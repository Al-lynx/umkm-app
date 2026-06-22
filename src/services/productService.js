import {
  getData,
  saveData,
  STORAGE_KEYS,
} from "./storageService";

// ===== PRODUCTS =====
export function getProducts() {
  return getData(STORAGE_KEYS.PRODUCTS);
}

export function saveProducts(products) {
  saveData(STORAGE_KEYS.PRODUCTS, products);
}

export function addProduct(product) {
  const products = getProducts();
  saveProducts([...products, product]);
}

export function updateProduct(product) {
  const products = getProducts();

  saveProducts(
    products.map((item) =>
      item.id === product.id ? product : item
    )
  );
}

export function deleteProduct(id) {
  const products = getProducts();

  saveProducts(
    products.filter((item) => item.id !== id)
  );
}