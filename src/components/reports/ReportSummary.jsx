import StatCard from "../ui/StatCard";

export default function ReportSummary({
  omzet,
  transaksi,
}) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-4
      "
    >
      <StatCard
        title="Omzet"
        value={`Rp ${omzet.toLocaleString(
          "id-ID"
        )}`}
      />

      <StatCard
        title="Transaksi"
        value={transaksi}
        color="green"
      />
    </div>
  );
}