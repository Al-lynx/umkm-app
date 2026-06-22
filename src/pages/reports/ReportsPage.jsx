import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import TopBar from "../../components/layout/TopBar";
import { Calendar, Download } from "lucide-react";

import { getTransactions } from "../../services/storageService";

export default function ReportsPage() {
  const navigate = useNavigate();

  const transactions = getTransactions();
  const [search, setSearch] = useState("");

  const filteredTransactions = useMemo(() => {
    if (!search) return transactions;

    return transactions.filter((trx) =>
      trx.date.toLowerCase().includes(search.toLowerCase())
    );
  }, [transactions, search]);

  const stats = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, trx) => {
        acc.omzet += trx.total;
        acc.tax += trx.tax || 0;
        acc.subtotal += trx.subtotal || 0;
        return acc;
      },
      { omzet: 0, tax: 0, subtotal: 0 }
    );
  }, [filteredTransactions]);

  const exportCSV = () => {
    const rows = [["Tanggal", "Metode", "Subtotal", "Pajak", "Total"]];

    filteredTransactions.forEach((trx) => {
      rows.push([
        trx.date,
        trx.paymentMethod,
        trx.subtotal,
        trx.tax,
        trx.total,
      ]);
    });

    const csv = rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `laporan-${Date.now()}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <TopBar
        title="Laporan"
        subtitle={`${filteredTransactions.length} transaksi`}
      />

      <div className="p-4 space-y-4">

        {/* FILTER */}
        <div className="bg-[#1B2122] border border-white/10 rounded-3xl p-4">

          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari tanggal..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#252C2F] border border-white/10"
            />
          </div>

          <button
            onClick={exportCSV}
            className="mt-4 w-full py-3 rounded-xl bg-orange-500 text-black font-semibold flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Export CSV
          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3">

          <StatCard label="Subtotal" value={stats.subtotal} />
          <StatCard label="Pajak" value={stats.tax} />
          <StatCard label="Omzet" value={stats.omzet} highlight />

        </div>

        {/* LIST */}
        <div className="space-y-4">

          {filteredTransactions.map((trx) => (
            <button
              key={trx.id}
              onClick={() => navigate(`/reports/${trx.id}`)}
              className="w-full bg-[#1B2122] border border-white/10 rounded-3xl p-4 text-left"
            >
              <p className="text-sm text-slate-400">{trx.date}</p>

              <h3 className="mt-2 font-bold text-orange-400">
                Rp {trx.total.toLocaleString("id-ID")}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {trx.paymentMethod}
              </p>
            </button>
          ))}

          {filteredTransactions.length === 0 && (
            <div className="text-center text-slate-500 py-12">
              Tidak ada transaksi
            </div>
          )}

        </div>

      </div>
    </>
  );
}

function StatCard({ label, value, highlight }) {
  return (
    <div
      className={`rounded-3xl p-4 border ${
        highlight
          ? "bg-orange-500/10 border-orange-500/20"
          : "bg-[#1B2122] border-white/10"
      }`}
    >
      <p className="text-xs text-slate-400">{label}</p>

      <h3 className={`mt-2 font-bold ${highlight ? "text-orange-400" : ""}`}>
        Rp {value.toLocaleString("id-ID")}
      </h3>
    </div>
  );
}