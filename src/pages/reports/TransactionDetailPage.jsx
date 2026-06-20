import { useParams } from "react-router-dom";

import TopBar from "../../components/layout/TopBar";

import {
  getTransactions,
} from "../../utils/storage";

export default function TransactionDetailPage() {
  const { id } =
    useParams();

  const transaction =
    getTransactions().find(
      (trx) =>
        String(trx.id) === id
    );

  if (!transaction) {
    return (
      <>
        <TopBar
          title="Detail Transaksi"
        />

        <div className="p-4">
          Data tidak ditemukan.
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar
        title="Detail Transaksi"
      />

      <div className="p-4 space-y-4">

        <div
          className="
            bg-[#1B2122]
            rounded-3xl
            p-5
          "
        >
          <p className="text-slate-400">
            Invoice
          </p>

          <h2
            className="
              text-orange-400
              font-bold
              mt-1
            "
          >
            {
              transaction.invoice
            }
          </h2>

          <p className="mt-4">
            {
              transaction.date
            }
          </p>

          <p className="text-slate-400">
            {
              transaction.paymentMethod
            }
          </p>
        </div>

        <div
          className="
            bg-[#1B2122]
            rounded-3xl
            p-5
          "
        >
          {transaction.items.map(
            (item) => (
              <div
                key={item.id}
                className="
                  flex
                  justify-between

                  py-3
                "
              >
                <span>
                  {item.name}
                  {" "}
                  x
                  {item.qty}
                </span>

                <span>
                  Rp{" "}
                  {(
                    item.qty *
                    item.price
                  ).toLocaleString(
                    "id-ID"
                  )}
                </span>
              </div>
            )
          )}

          <div
            className="
              border-t
              border-white/10

              pt-4
              mt-4

              flex
              justify-between

              text-xl
              font-bold
            "
          >
            <span>Total</span>

            <span className="text-orange-400">
              Rp{" "}
              {transaction.total.toLocaleString(
                "id-ID"
              )}
            </span>
          </div>
        </div>

      </div>
    </>
  );
}