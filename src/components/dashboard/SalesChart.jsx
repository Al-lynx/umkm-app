import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

export default function SalesChart({
  data,
}) {
  return (
    <div
      className="
        bg-[#1B2122]
        border border-white/10
        rounded-3xl
        p-5
      "
    >
      <h3
        className="
          font-semibold
          mb-5
        "
      >
        Penjualan
      </h3>

      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <AreaChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#94A3B8"
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#F97316"
            fill="#F97316"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}