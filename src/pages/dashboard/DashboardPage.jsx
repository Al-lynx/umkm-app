import TopBar from "../../components/layout/TopBar";

import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardQuickActions from "../../components/dashboard/DashboardQuickActions";
import DashboardInsights from "../../components/dashboard/DashboardInsights";
import DashboardTopProducts from "../../components/dashboard/DashboardTopProducts";
import DashboardActivity from "../../components/dashboard/DashboardActivity";
import DashboardChart from "../../components/dashboard/DashboardChart";
import LowStockWidget from "../../components/dashboard/LowStockWidget";

import { getProducts } from "../../services/productService";
import { getTransactions } from "../../services/transactionService";

import { getDashboardStats } from "../../services/dashboardService";

export default function DashboardPage() {
  const products =
    getProducts();

  const transactions =
    getTransactions();

  const stats =
    getDashboardStats(
      transactions,
      products
    );

  return (
    <>
      <TopBar
        title="Dashboard"
        subtitle="Ringkasan Bisnis"
      />

      <div className="p-4 space-y-5">

        <DashboardStats
          stats={stats}
        />

        <DashboardQuickActions />

        <DashboardInsights
          transactions={transactions}
          products={products}
        />

        <DashboardTopProducts
          transactions={transactions}
        />

        <DashboardActivity
          transactions={transactions}
        />

        <DashboardChart
          transactions={transactions}
        />

        <LowStockWidget
          products={products}
        />

      </div>
    </>
  );
}