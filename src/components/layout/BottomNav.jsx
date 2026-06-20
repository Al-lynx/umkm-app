import { NavLink } from "react-router-dom";

import {
  Store,
  Package,
  LayoutDashboard,
  Receipt,
  Settings,
} from "lucide-react";

export default function BottomNav() {
  const navClass = ({ isActive }) =>
    `
      flex
      flex-col
      items-center
      justify-center
      gap-1
      flex-1
      transition-all
      ${
        isActive
          ? "text-[var(--brand-primary)]"
          : "text-slate-500"
      }
    `;

  return (
    <div className="bottom-Nav">
      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0

          h-16

          bg-(--bg-secondary)
          border-t
          border-(--border-color)

          flex
          z-50
        "
      >
        <NavLink
          to="/"
          className={navClass}
        >
          <Store size={20} />

          <span className="text-xs">
            Kasir
          </span>
        </NavLink>

        <NavLink
          to="/products"
          className={navClass}
        >
          <Package size={20} />

          <span className="text-xs">
            Produk
          </span>
        </NavLink>

        <NavLink
          to="/dashboard"
          className={navClass}
        >
          <LayoutDashboard size={20} />

          <span className="text-xs">
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/reports"
          className={navClass}
        >
          <Receipt size={20} />

          <span className="text-xs">
            Laporan
          </span>
        </NavLink>

        <NavLink
          to="/settings"
          className={navClass}
        >
          <Settings size={20} />

          <span className="text-xs">
            Setting
          </span>
        </NavLink>
      </nav>
    </div>
  );
}