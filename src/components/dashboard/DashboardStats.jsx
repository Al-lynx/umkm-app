import {
  Wallet,
  ShoppingCart,
  Package,
  TrendingUp,
} from "lucide-react";

export default function DashboardStats({
  stats,
}) {
  const items = [
    {
      title: "Omzet",
      value: `Rp ${stats.omzet.toLocaleString(
        "id-ID"
      )}`,
      icon: Wallet,
    },

    {
      title: "Transaksi",
      value:
        stats.totalTransaksi,
      icon: ShoppingCart,
    },

    {
      title: "Produk",
      value:
        stats.totalProduk,
      icon: Package,
    },

    {
      title: "Rata-rata",
      value: `Rp ${stats.rataRata.toLocaleString(
        "id-ID"
      )}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => {
        const Icon =
          item.icon;

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

            <p className="text-sm text-slate-400">
              {item.title}
            </p>

            <h3 className="text-2xl font-bold mt-1">
              {item.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
}