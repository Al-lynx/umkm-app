import {
  Receipt,
  Wallet,
  QrCode,
  CreditCard,
  Landmark,
  Clock3,
} from "lucide-react";

import {
  getLatestTransactions,
} from "../../services/analyticsService";

export default function DashboardActivity({
  transactions,
}) {
  const latestTransactions =
    getLatestTransactions(
      transactions
    );

  const paymentIcons = {
    Tunai: Wallet,
    QRIS: QrCode,
    Transfer: Landmark,
    "E-Wallet": CreditCard,
  };

  return (
    <section
      className="
        bg-[#1B2122]
        border border-white/10
        rounded-3xl
        p-5
      "
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-slate-400 text-sm">
            Riwayat
          </p>

          <h3 className="text-xl font-bold mt-1">
            Aktivitas Terbaru
          </h3>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
          <Clock3
            size={22}
            className="text-orange-400"
          />
        </div>
      </div>

      {latestTransactions.length ===
      0 ? (
        <div className="py-14 text-center text-slate-500">
          Belum ada aktivitas
        </div>
      ) : (
        <div className="space-y-4">
          {latestTransactions.map(
            (trx) => {
              const Icon =
                paymentIcons[
                  trx.paymentMethod
                ] || Receipt;

              return (
                <div
                  key={trx.id}
                  className="
                    bg-[#252C2F]
                    rounded-2xl
                    p-4
                    flex gap-4
                  "
                >
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <Icon size={18} />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-semibold">
                          {
                            trx.paymentMethod
                          }
                        </h4>

                        <p className="text-xs text-slate-500">
                          {trx.date}
                        </p>
                      </div>

                      <p className="font-bold text-orange-400">
                        Rp{" "}
                        {trx.total.toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}