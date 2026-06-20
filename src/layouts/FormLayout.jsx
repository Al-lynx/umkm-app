import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function FormLayout() {
  return (
    <div className="app-shell">
      <div className="app-content form-mode">
        <Outlet />
      </div>

      <Toaster position="top-center" />
    </div>
  );
}