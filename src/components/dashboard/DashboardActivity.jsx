import {
  Receipt,
  Wallet,
  QrCode,
  CreditCard,
  Landmark,
  Clock3,
} from "lucide-react";

export default function DashboardActivity({
  transactions,
}) {
  const latestTransactions =
    [...transactions]
      .sort(
        (a, b) =>
          new Date(
            b.createdAt ||
              b.date
          ) -
          new Date(
            a.createdAt ||
              a.date
          )
      )
      .slice(0, 8);

  const getPaymentIcon =
    (method) => {
      switch (method) {
        case "Tunai":
          return <Wallet size={18} />;

        case "QRIS":
          return <QrCode size={18} />;

        case "Transfer":
          return (
            <Landmark size={18} />
          );

        case "E-Wallet":
          return (
            <CreditCard size={18} />
          );

        default:
          return (
            <Receipt size={18} />
          );
      }
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
      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >
        <div>
          <p className="text-slate-400 text-sm">
            Riwayat
          </p>

          <h3
            className="
              text-xl
              font-bold
              mt-1
            "
          >
            Aktivitas Terbaru
          </h3>
        </div>

        <div
          className="
            w-12
            h-12

            rounded-2xl

            bg-orange-500/10

            flex
            items-center
            justify-center
          "
        >
          <Clock3
            size={22}
            className="
              text-orange-400
            "
          />
        </div>
      </div>

      {latestTransactions.length ===
      0 ? (
        <div
          className="
            py-14
            text-center
            text-slate-500
          "
        >
          Belum ada aktivitas
        </div>
      ) : (
        <div
          className="
            relative
            space-y-5
          "
        >
          {latestTransactions.map(
            (trx, index) => (
              <div
                key={trx.id}
                className="
                  relative
                  flex
                  gap-4
                "
              >
                {index !==
                  latestTransactions.length -
                    1 && (
                  <div
                    className="
                      absolute
                      left-4.5
                      top-10

                      w-0.5
                      h-full

                      bg-white/10
                    "
                  />
                )}

                <div
                  className="
                    min-w-10
                    w-10
                    h-10

                    rounded-full

                    bg-orange-500/10

                    flex
                    items-center
                    justify-center

                    text-orange-400

                    z-10
                  "
                >
                  {getPaymentIcon(
                    trx.paymentMethod
                  )}
                </div>

                <div
                  className="
                    flex-1

                    bg-[#252C2F]
                    rounded-2xl
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      justify-between
                      items-start
                    "
                  >
                    <div>
                      <h4
                        className="
                          font-semibold
                        "
                      >
                        {
                          trx.paymentMethod
                        }
                      </h4>

                      <p
                        className="
                          text-xs
                          text-slate-500
                          mt-1
                        "
                      >
                        {trx.date}
                      </p>
                    </div>

                    <div
                      className="
                        text-right
                      "
                    >
                      <p
                        className="
                          text-orange-400
                          font-bold
                        "
                      >
                        Rp{" "}
                        {trx.total.toLocaleString(
                          "id-ID"
                        )}
                      </p>

                      <p
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        {
                          trx.items
                            .length
                        }{" "}
                        item
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      mt-3

                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {trx.items
                      .slice(0, 3)
                      .map(
                        (
                          item
                        ) => (
                          <span
                            key={
                              item.id
                            }
                            className="
                              px-3
                              py-1

                              rounded-full

                              text-xs

                              bg-black/20
                              text-slate-300
                            "
                          >
                            {
                              item.name
                            }
                          </span>
                        )
                      )}

                    {trx.items
                      .length >
                      3 && (
                      <span
                        className="
                          px-3
                          py-1

                          rounded-full

                          text-xs

                          bg-orange-500/10
                          text-orange-400
                        "
                      >
                        +
                        {trx.items
                          .length -
                          3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}