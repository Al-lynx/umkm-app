import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function DashboardChart({
  transactions,
}) {
  const groupedSales = {};

  transactions.forEach(
    (trx) => {
      const date =
        trx.createdAt
          ?.split("T")[0] ||
        trx.date;

      if (
        !groupedSales[date]
      ) {
        groupedSales[
          date
        ] = 0;
      }

      groupedSales[
        date
      ] += trx.total;
    }
  );

  const chartData =
    Object.entries(
      groupedSales
    )
      .map(
        ([date, total]) => ({
          date:
            new Date(
              date
            ).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month:
                  "short",
              }
            ),

          total,
        })
      )
      .slice(-7);

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
          Grafik Penjualan
        </p>

        <h3
          className="
            text-xl
            font-bold
            mt-1
          "
        >
          7 Hari Terakhir
        </h3>
      </div>

      {chartData.length ===
      0 ? (
        <div
          className="
            h-65

            flex
            items-center
            justify-center

            text-slate-500
          "
        >
          Belum ada data
        </div>
      ) : (
        <div
          className="
            h-65
          "
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={
                chartData
              }
            >
              <defs>
                <linearGradient
                  id="sales"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#F97316"
                    stopOpacity={
                      0.4
                    }
                  />

                  <stop
                    offset="95%"
                    stopColor="#F97316"
                    stopOpacity={
                      0
                    }
                  />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="date"
                tick={{
                  fill:
                    "#94A3B8",
                }}
              />

              <YAxis
                tick={{
                  fill:
                    "#94A3B8",
                }}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="total"
                stroke="#F97316"
                fill="url(#sales)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}