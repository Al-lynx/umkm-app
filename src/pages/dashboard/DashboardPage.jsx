import TopBar from "../../components/layout/TopBar";

import DashboardStats from "../../components/dashboard/DashboardStats";

import DashboardQuickActions from "../../components/dashboard/DashboardQuickActions";

import DashboardInsights from "../../components/dashboard/DashboardInsights";

import DashboardTopProducts from "../../components/dashboard/DashboardTopProducts";

import DashboardActivity from "../../components/dashboard/DashboardActivity";

import DashboardChart from "../../components/dashboard/DashboardChart";

import {
  getTransactions,
  getProducts,
} from "../../utils/storage";

export default function DashboardPage() {
  const transactions =
    getTransactions();

  const products =
    getProducts();

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

  return (
    <>
      <TopBar
        title="Dashboard"
        subtitle="Ringkasan Bisnis"
      />

      <div className="p-4 space-y-5">

        <DashboardStats
          omzet={omzet}
          transaksi={totalTransaksi}
          produk={totalProduk}
          rataRata={rataRata}
        />

        <DashboardQuickActions />

        <DashboardInsights
          transactions={transactions}
          products={products}
        />

        <DashboardChart
          transactions={transactions}
        />

        <DashboardTopProducts
          transactions={transactions}
        />

        <DashboardActivity
          transactions={transactions}
        />

      </div>
    </>
  );
}