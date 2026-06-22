import { Bell } from "lucide-react";
import { getProducts } from "../../services/storageService";

export default function NotificationBell() {
  const products = getProducts();

  const totalAlerts = products.filter(
    (product) => product.stock <= 10
  ).length;

  return (
    <button className="relative w-11 h-11 rounded-2xl bg-[#1B2122] border border-white/10 flex items-center justify-center">
      <Bell size={20} />

      {totalAlerts > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-[10px] font-bold flex items-center justify-center">
          {totalAlerts}
        </span>
      )}
    </button>
  );
}