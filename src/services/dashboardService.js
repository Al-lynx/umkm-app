export function getDashboardStats(
  transactions,
  products
) {
  const omzet =
    transactions.reduce(
      (acc, trx) =>
        acc + trx.total,
      0
    );

  const totalTransaksi =
    transactions.length;

  const totalProduk =
    products.length;

  const rataRata =
    totalTransaksi
      ? Math.round(
          omzet /
            totalTransaksi
        )
      : 0;

  return {
    omzet,
    totalTransaksi,
    totalProduk,
    rataRata,
  };
}

export function getLowStockProducts(
  products
) {
  return products.filter(
    (product) =>
      product.stock <= 10
  );
}

export function getDashboardInsights() {
  // isi logic insight
}