import { useNavigate } from "react-router-dom";

import {
  ShoppingCart,
  Package,
  BarChart3,
  Download,
} from "lucide-react";

export default function DashboardQuickActions() {
  const navigate =
    useNavigate();

  const exportBackup =
    () => {
      const backup = {
        products:
          JSON.parse(
            localStorage.getItem(
              "products"
            )
          ) || [],

        transactions:
          JSON.parse(
            localStorage.getItem(
              "transactions"
            )
          ) || [],

        exportedAt:
          new Date().toISOString(),
      };

      const blob =
        new Blob(
          [
            JSON.stringify(
              backup,
              null,
              2
            ),
          ],
          {
            type: "application/json",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const a =
        document.createElement(
          "a"
        );

      a.href = url;

      a.download = `backup-${Date.now()}.json`;

      a.click();

      URL.revokeObjectURL(
        url
      );
    };

  const actions = [
    {
      title:
        "Buka Kasir",
      subtitle:
        "Mulai transaksi",
      icon:
        ShoppingCart,
      onClick:
        () =>
          navigate(
            "/"
          ),
    },

    {
      title:
        "Produk",
      subtitle:
        "Kelola menu",
      icon: Package,
      onClick:
        () =>
          navigate(
            "/products"
          ),
    },

    {
      title:
        "Laporan",
      subtitle:
        "Riwayat penjualan",
      icon:
        BarChart3,
      onClick:
        () =>
          navigate(
            "/reports"
          ),
    },

    {
      title:
        "Backup",
      subtitle:
        "Export data",
      icon:
        Download,
      onClick:
        exportBackup,
    },
  ];

  return (
    <section
      className="
        bg-[#1B2122]
        border border-white/10

        rounded-3xl

        p-5
      "
    >
      <div className="mb-5">
        <p
          className="
            text-slate-400
            text-sm
          "
        >
          Shortcut
        </p>

        <h3
          className="
            text-xl
            font-bold
            mt-1
          "
        >
          Quick Actions
        </h3>
      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-4
        "
      >
        {actions.map(
          (
            action
          ) => {
            const Icon =
              action.icon;

            return (
              <button
                key={
                  action.title
                }
                onClick={
                  action.onClick
                }
                className="
                  group

                  bg-[#252C2F]

                  border
                  border-white/5

                  rounded-2xl

                  p-4

                  text-left

                  transition-all

                  hover:border-orange-500/30
                  hover:-translate-y-1
                "
              >
                <div
                  className="
                    w-12
                    h-12

                    rounded-2xl

                    bg-orange-500/10

                    flex
                    items-center
                    justify-center

                    text-orange-400

                    group-hover:bg-orange-500
                    group-hover:text-black

                    transition
                  "
                >
                  <Icon
                    size={
                      22
                    }
                  />
                </div>

                <h4
                  className="
                    mt-4
                    font-semibold
                  "
                >
                  {
                    action.title
                  }
                </h4>

                <p
                  className="
                    text-xs
                    text-slate-500
                    mt-1
                  "
                >
                  {
                    action.subtitle
                  }
                </p>
              </button>
            );
          }
        )}
      </div>
    </section>
  );
}