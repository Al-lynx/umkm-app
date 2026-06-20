import {
  X,
  Printer,
} from "lucide-react";

export default function ReceiptModal({
  isOpen,
  transaction,
  onClose,
}) {
  if (!isOpen) return null;

  const printReceipt = () => {
    window.print();
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-999

        bg-black/70

        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          bg-[#1B2122]

          border
          border-white/10

          rounded-3xl

          w-full
          max-w-lg

          mx-4

          overflow-hidden
        "
      >
        <div
          className="
            flex
            justify-between
            items-center

            p-5

            border-b
            border-white/10
          "
        >
          <h2 className="font-bold text-xl">
            Struk Pembayaran
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-5">

          <div className="text-center">

            <h3
              className="
                text-2xl
                font-bold
                text-orange-400
              "
            >
              UMKM POS
            </h3>

            <p
              className="
                text-slate-500
                text-sm
              "
            >
              Terima kasih
            </p>

          </div>

          <div
            className="
              mt-5
              pt-5

              border-t
              border-white/10
            "
          >
            <p>
              Tanggal:
              {" "}
              {transaction.date}
            </p>

            <p>
              Metode:
              {" "}
              {transaction.paymentMethod}
            </p>
          </div>

          <div className="mt-5 space-y-3">

            {transaction.items.map(
              (item) => (
                <div
                  key={item.id}
                  className="
                    flex
                    justify-between
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

          </div>

          <div
            className="
              mt-5
              pt-5

              border-t
              border-white/10

              space-y-2
            "
          >
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>
                Rp{" "}
                {transaction.subtotal.toLocaleString(
                  "id-ID"
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Pajak</span>

              <span>
                Rp{" "}
                {transaction.tax.toLocaleString(
                  "id-ID"
                )}
              </span>
            </div>

            <div
              className="
                flex
                justify-between

                font-bold
                text-xl
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
            p-5

            border-t
            border-white/10
          "
        >
          <button
            onClick={printReceipt}
            className="
              w-full

              py-3

              rounded-2xl

              bg-orange-500

              text-black
              font-semibold

              flex
              justify-center
              items-center
              gap-2
            "
          >
            <Printer size={18} />
            Cetak Struk
          </button>
        </div>

      </div>
    </div>
  );
}