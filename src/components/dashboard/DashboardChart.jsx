import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  getSalesChartData,
} from "../../services/analyticsService";

export default function DashboardChart({
  transactions,
}) {
  const chartData =
    getSalesChartData(
      transactions
    );

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
        <p className="text-slate-400 text-sm">
          Grafik Penjualan
        </p>

        <h3 className="text-xl font-bold mt-1">
          7 Hari Terakhir
        </h3>
      </div>

      {chartData.length ===
      0 ? (
        <div className="h-64 flex items-center justify-center text-slate-500">
          Belum ada data
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer>
            <AreaChart
              data={chartData}
            >
              <XAxis
                dataKey="date"
              />

              <YAxis />

              <Tooltip />

              <Area
                dataKey="total"
                stroke="#F97316"
                fill="#F97316"
                fillOpacity={0.15}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}