import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import FormLayout from "../layouts/FormLayout";

// pages
import POSPage from "../pages/pos/POSPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ReportsPage from "../pages/reports/ReportsPage";

import CheckoutPage from "../pages/pos/CheckoutPage";
import ProductListPage from "../pages/products/ProductListPage";
import TransactionDetailPage from "../pages/reports/TransactionDetailPage";
import SettingsPage from "../pages/settings/SettingsPage";

export default function AppRoutes() {
  return (
    <Routes>

      {/* 🟢 MAIN APP (WITH NAV) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<POSPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Route>

      {/* 🔵 FORM FLOW (NO NAV) */}
      <Route element={<FormLayout />}>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/transaction/:id" element={<TransactionDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

    </Routes>
  );
}