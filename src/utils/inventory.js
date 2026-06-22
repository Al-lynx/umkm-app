export function getLowStockProducts(
  products
) {
  return products.filter(
    (product) =>
      product.stock <= 10
  );
}

export function getOutOfStockProducts(
  products
) {
  return products.filter(
    (product) =>
      product.stock <= 0
  );
}

export function getInventoryStats(
  products
) {
  const lowStock =
    products.filter(
      (p) =>
        p.stock > 0 &&
        p.stock <= 10
    );

  const outOfStock =
    products.filter(
      (p) => p.stock <= 0
    );

  return {
    lowStock,
    outOfStock,
    totalAlert:
      lowStock.length +
      outOfStock.length,
  };
}