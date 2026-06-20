import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Package,
} from "lucide-react";

export default function DashboardInsights({
  transactions,
  products,
}) {
  const productSales = {};

  transactions.forEach(
    (trx) => {
      trx.items.forEach(
        (item) => {
          if (
            !productSales[item.id]
          ) {
            productSales[
              item.id
            ] = {
              name:
                item.name,
              qty: 0,
            };
          }

          productSales[
            item.id
          ].qty += item.qty;
        }
      );
    }
  );

  const bestSeller =
    Object.values(
      productSales
    ).sort(
      (a, b) =>
        b.qty - a.qty
    )[0];

  const lowStock =
    products
      .filter(
        (product) =>
          product.stock <= 10
      )
      .sort(
        (a, b) =>
          a.stock -
          b.stock
      )[0];

  const dailySales = {};

  transactions.forEach(
    (trx) => {
      const date =
        trx.createdAt
          ?.split("T")[0] ||
        trx.date;

      if (
        !dailySales[date]
      ) {
        dailySales[
          date
        ] = 0;
      }

      dailySales[date] +=
        trx.total;
    }
  );

  const bestDay =
    Object.entries(
      dailySales
    ).sort(
      (a, b) =>
        b[1] - a[1]
    )[0];

  const insights = [
    {
      title:
        "Produk Terlaris",

      value:
        bestSeller?.name ||
        "-",

      description:
        bestSeller
          ? `${bestSeller.qty} terjual`
          : "Belum ada data",

      icon:
        TrendingUp,
    },

    {
      title:
        "Perlu Restock",

      value:
        lowStock?.name ||
        "-",

      description:
        lowStock
          ? `Sisa ${lowStock.stock}`
          : "Stok aman",

      icon:
        AlertTriangle,
    },

    {
      title:
        "Hari Terbaik",

      value:
        bestDay?.[0] ||
        "-",

      description:
        bestDay
          ? `Rp ${bestDay[1].toLocaleString(
              "id-ID"
            )}`
          : "Belum ada data",

      icon:
        Lightbulb,
    },

    {
      title:
        "Total Produk",

      value:
        products.length,

      description:
        "Produk aktif",

      icon:
        Package,
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
          Smart Analytics
        </p>

        <h3
          className="
            text-xl
            font-bold
            mt-1
          "
        >
          Insight Bisnis
        </h3>
      </div>

      <div className="space-y-4">
        {insights.map(
          (
            insight
          ) => {
            const Icon =
              insight.icon;

            return (
              <div
                key={
                  insight.title
                }
                className="
                  bg-[#252C2F]
                  rounded-2xl
                  p-4

                  flex
                  gap-4
                  items-center
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
                  "
                >
                  <Icon
                    size={
                      22
                    }
                    className="
                      text-orange-400
                    "
                  />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    {
                      insight.title
                    }
                  </p>

                  <h4
                    className="
                      font-semibold
                      mt-1
                    "
                  >
                    {
                      insight.value
                    }
                  </h4>

                  <p
                    className="
                      text-xs
                      text-slate-400
                      mt-1
                    "
                  >
                    {
                      insight.description
                    }
                  </p>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}