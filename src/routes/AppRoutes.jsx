import {
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import FullScreenLayout from "../layouts/FullScreenLayout";

import POSPage from "../pages/pos/POSPage";
import CheckoutPage from "../pages/pos/CheckoutPage";

import ProductListPage from "../pages/products/ProductListPage";
import ProductFormPage from "../pages/products/ProductFormPage";

import DashboardPage from "../pages/dashboard/DashboardPage";

import ReportsPage from "../pages/reports/ReportsPage";
import ReportDetailPage from "../pages/reports/ReportDetailPage";

import SettingsPage from "../pages/settings/SettingsPage";

export default function AppRoutes() {
  return (
    <Routes>

      {/* MAIN APP */}

      <Route
        element={<MainLayout />}
      >
        <Route
          path="/"
          element={<POSPage />}
        />

        <Route
          path="/products"
          element={
            <ProductListPage />
          }
        />

        <Route
          path="/dashboard"
          element={
            <DashboardPage />
          }
        />

        <Route
          path="/reports"
          element={
            <ReportsPage />
          }
        />

        <Route
          path="/settings"
          element={
            <SettingsPage />
          }
        />
      </Route>

      {/* FULLSCREEN FLOW */}

      <Route
        element={
          <FullScreenLayout />
        }
      >
        <Route
          path="/checkout"
          element={
            <CheckoutPage />
          }
        />

        <Route
          path="/products/new"
          element={
            <ProductFormPage />
          }
        />

        <Route
          path="/products/edit/:id"
          element={
            <ProductFormPage />
          }
        />

        <Route
          path="/reports/:id"
          element={
            <ReportDetailPage />
          }
        />
      </Route>

    </Routes>
  );
}