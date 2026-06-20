import {
  Wallet,
  ShoppingCart,
  Package,
  TrendingUp,
} from "lucide-react";

export default function DashboardStats({
  omzet,
  transaksi,
  produk,
  rataRata,
}) {
  const stats = [
    {
      title: "Omzet",
      value: `Rp ${omzet.toLocaleString("id-ID")}`,
      icon: Wallet,
    },
    {
      title: "Transaksi",
      value: transaksi,
      icon: ShoppingCart,
    },
    {
      title: "Produk",
      value: produk,
      icon: Package,
    },
    {
      title: "Rata-rata",
      value: `Rp ${rataRata.toLocaleString("id-ID")}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              bg-[#1B2122]
              border border-white/10
              rounded-3xl
              p-5
            "
          >
            <Icon
              size={22}
              className="
                text-orange-400
                mb-4
              "
            />

            <p className="text-slate-400 text-sm">
              {item.title}
            </p>

            <h3 className="font-bold text-2xl mt-1">
              {item.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
}