import { Outlet } from "react-router-dom";
import BottomNav from "../components/layout/BottomNav";
import { Toaster } from "react-hot-toast";

export default function MainLayout() {
  return (
    <div className="app-shell">
      <div className="app-content">
        <Outlet />
      </div>

      <BottomNav />

      <Toaster position="top-center" />
    </div>
  );
}