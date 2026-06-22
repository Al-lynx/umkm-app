import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getTransactions } from "../../services/storageService";

export default function ReportDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const transactions = getTransactions();

  const transaction = transactions.find(
    (trx) => String(trx.id) === id
  );

  if (!transaction) {
    return (
      <div className="p-6">
        <h2>Transaksi tidak ditemukan</h2>

        <button
          onClick={() => navigate("/reports")}
          className="mt-4 px-4 py-2 bg-orange-500 rounded-xl text-black"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-[#0F1113]/95 backdrop-blur-xl border-b border-white/10 p-4 flex items-center gap-4">

        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>

        <div>
          <h1 className="text-xl font-bold">Detail Transaksi</h1>
          <p className="text-sm text-slate-400">{transaction.date}</p>
        </div>

      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-5">

        <div className="bg-[#1B2122] border border-white/10 rounded-3xl p-5">

          <InfoRow label="Metode" value={transaction.paymentMethod} />
          <InfoRow label="Subtotal" value={`Rp ${transaction.subtotal.toLocaleString("id-ID")}`} />
          <InfoRow label="Pajak" value={`Rp ${transaction.tax.toLocaleString("id-ID")}`} />
          <InfoRow
            label="Total"
            value={`Rp ${transaction.total.toLocaleString("id-ID")}`}
            highlight
          />

        </div>

        <div className="bg-[#1B2122] border border-white/10 rounded-3xl p-5">

          <h3 className="font-bold mb-4">Produk</h3>

          <div className="space-y-3">
            {transaction.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between bg-[#252C2F] p-4 rounded-2xl"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-slate-400">
                    {item.qty} x Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="font-semibold">
                  Rp {(item.qty * item.price).toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between py-2">
      <span className="text-slate-400">{label}</span>
      <span className={highlight ? "font-bold text-orange-400" : ""}>
        {value}
      </span>
    </div>
  );
}