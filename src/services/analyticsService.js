import { getProducts } from "./storageService";

// ===== TOP PRODUCTS =====
export function getTopProducts(transactions = []) {
  const map = new Map();

  transactions.forEach((trx) => {
    trx.items.forEach((item) => {
      const existing = map.get(item.id) || {
        id: item.id,
        name: item.name,
        sold: 0,
        revenue: 0,
      };

      existing.sold += item.qty;
      existing.revenue += item.qty * item.price;

      map.set(item.id, existing);
    });
  });

  return Array.from(map.values())
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);
}

// ===== LATEST TRANSACTIONS =====
export function getLatestTransactions(transactions = []) {
  return [...transactions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
}

// ===== CHART DATA =====
export function getSalesChartData(transactions = []) {
  const map = new Map();

  transactions.forEach((trx) => {
    const date = trx.date.split(",")[0]; // aman untuk format ID locale

    map.set(date, (map.get(date) || 0) + trx.total);
  });

  return Array.from(map.entries()).map(([date, total]) => ({
    date,
    total,
  }));
}

// ===== INSIGHTS =====
export function getDashboardInsights(transactions = [], products = []) {
  const lowStock = products.filter((p) => p.stock <= 10).length;

  const bestSeller = getTopProducts(transactions)[0];

  const totalProduct = products.length;

  const bestDay = transactions.reduce(
    (best, trx) => (trx.total > (best?.total || 0) ? trx : best),
    null
  );

  return [
    {
      type: "bestSeller",
      title: "Produk Terlaris",
      value: bestSeller?.name || "-",
      description: "Produk dengan penjualan tertinggi",
    },
    {
      type: "lowStock",
      title: "Stok Menipis",
      value: `${lowStock} produk`,
      description: "Perlu restock segera",
    },
    {
      type: "bestDay",
      title: "Transaksi Terbesar",
      value: bestDay ? bestDay.date : "-",
      description: "Hari dengan omzet tertinggi",
    },
    {
      type: "totalProduct",
      title: "Total Produk",
      value: `${totalProduct} item`,
      description: "Semua produk aktif",
    },
  ];
}