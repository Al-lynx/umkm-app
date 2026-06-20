import {
  CheckCircle2,
  Printer,
  X,
} from "lucide-react";

export default function ReceiptModal({
  open,
  transaction,
  onClose,
}) {
  if (
    !open ||
    !transaction
  )
    return null;

  const handlePrint =
    () => {
      window.print();
    };

  return (
    <div
      className="
        fixed inset-0
        bg-black/70
        backdrop-blur-sm
        z-100

        flex
        items-center
        justify-center

        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md

          bg-[#1B2122]

          border
          border-white/10

          rounded-3xl

          overflow-hidden
        "
      >
        <div className="p-6 text-center">

          <CheckCircle2
            size={72}
            className="
              mx-auto
              text-green-400
            "
          />

          <h2
            className="
              text-2xl
              font-bold
              mt-4
            "
          >
            Pembayaran Berhasil
          </h2>

          <p className="text-slate-400 mt-2">
            Invoice
          </p>

          <p
            className="
              text-orange-400
              font-semibold
              mt-1
            "
          >
            {
              transaction.invoice
            }
          </p>

        </div>

        <div
          className="
            px-6
            pb-4
          "
        >
          <div
            className="
              bg-[#252C2F]
              rounded-2xl
              p-4
            "
          >
            {transaction.items.map(
              (item) => (
                <div
                  key={item.id}
                  className="
                    flex
                    justify-between

                    py-2
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

                mt-3
                pt-3

                flex
                justify-between

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

        <div
          className="
            p-4

            border-t
            border-white/10

            flex
            gap-3
          "
        >
          <button
            onClick={
              handlePrint
            }
            className="
              flex-1

              py-3

              rounded-xl

              bg-[#252C2F]

              flex
              items-center
              justify-center
              gap-2
            "
          >
            <Printer size={18} />
            Cetak
          </button>

          <button
            onClick={onClose}
            className="
              flex-1

              py-3

              rounded-xl

              bg-orange-500

              text-black
              font-semibold

              flex
              items-center
              justify-center
              gap-2
            "
          >
            <X size={18} />
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}