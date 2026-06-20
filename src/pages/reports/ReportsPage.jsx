import { useMemo, useState } from "react";

import TopBar from "../../components/layout/TopBar";

import {
  Calendar,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import {
  getTransactions,
} from "../../utils/storage";

export default function ReportsPage() {
  const transactions =
    getTransactions();

  const [search, setSearch] =
    useState("");

  const [expandedId, setExpandedId] =
    useState(null);

  const filteredTransactions =
    useMemo(() => {
      if (!search)
        return transactions;

      return transactions.filter(
        (trx) =>
          trx.date
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [transactions, search]);

  const stats = useMemo(() => {
    const omzet =
      filteredTransactions.reduce(
        (acc, trx) =>
          acc + trx.total,
        0
      );

    const tax =
      filteredTransactions.reduce(
        (acc, trx) =>
          acc + (trx.tax || 0),
        0
      );

    const subtotal =
      filteredTransactions.reduce(
        (acc, trx) =>
          acc +
          (trx.subtotal || 0),
        0
      );

    return {
      omzet,
      tax,
      subtotal,
    };
  }, [filteredTransactions]);

  const exportCSV = () => {
    const rows = [
      [
        "Tanggal",
        "Metode",
        "Subtotal",
        "Pajak",
        "Total",
      ],
    ];

    filteredTransactions.forEach(
      (trx) => {
        rows.push([
          trx.date,
          trx.paymentMethod,
          trx.subtotal,
          trx.tax,
          trx.total,
        ]);
      }
    );

    const csv =
      rows
        .map((row) =>
          row.join(",")
        )
        .join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      `laporan-${Date.now()}.csv`;

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

        <div
          className="
            bg-[#1B2122]
            border border-white/10
            rounded-3xl
            p-4
          "
        >
          <div
            className="
              relative
            "
          >
            <Calendar
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-500
              "
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Cari tanggal..."
              className="
                w-full
                pl-11
                pr-4
                py-3

                rounded-xl

                bg-[#252C2F]
                border border-white/10

                outline-none
              "
            />
          </div>

          <button
            onClick={exportCSV}
            className="
              mt-4
              w-full

              py-3

              rounded-xl

              bg-orange-500
              hover:bg-orange-600

              text-black
              font-semibold

              flex
              items-center
              justify-center
              gap-2
            "
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-3 gap-3">

          <StatCard
            label="Subtotal"
            value={stats.subtotal}
          />

          <StatCard
            label="Pajak"
            value={stats.tax}
          />

          <StatCard
            label="Omzet"
            value={stats.omzet}
            highlight
          />

        </div>

        {/* TRANSAKSI */}

        <div className="space-y-4">

          {filteredTransactions.map(
            (trx) => (
              <div
                key={trx.id}
                className="
                  bg-[#1B2122]
                  border border-white/10

                  rounded-3xl

                  overflow-hidden
                "
              >
                <button
                  onClick={() =>
                    setExpandedId(
                      expandedId ===
                        trx.id
                        ? null
                        : trx.id
                    )
                  }
                  className="
                    w-full

                    p-4

                    flex
                    justify-between
                    items-center
                  "
                >
                  <div>
                    <p
                      className="
                        text-left
                        text-sm
                        text-slate-400
                      "
                    >
                      {trx.date}
                    </p>

                    <h3
                      className="
                        text-left
                        font-bold
                        text-orange-400
                        mt-1
                      "
                    >
                      Rp{" "}
                      {trx.total.toLocaleString(
                        "id-ID"
                      )}
                    </h3>
                  </div>

                  {expandedId ===
                  trx.id ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </button>

                {expandedId ===
                  trx.id && (
                  <div
                    className="
                      px-4
                      pb-4
                      border-t
                      border-white/5
                    "
                  >
                    <div className="mt-4 space-y-2">

                      <InfoRow
                        label="Metode"
                        value={
                          trx.paymentMethod
                        }
                      />

                      <InfoRow
                        label="Subtotal"
                        value={`Rp ${trx.subtotal.toLocaleString(
                          "id-ID"
                        )}`}
                      />

                      <InfoRow
                        label="Pajak"
                        value={`Rp ${trx.tax.toLocaleString(
                          "id-ID"
                        )}`}
                      />

                    </div>

                    <div
                      className="
                        mt-4
                        space-y-2
                      "
                    >
                      {trx.items.map(
                        (item) => (
                          <div
                            key={`${trx.id}-${item.id}`}
                            className="
                              flex
                              justify-between

                              text-sm

                              bg-[#252C2F]

                              p-3

                              rounded-xl
                            "
                          >
                            <span>
                              {
                                item.name
                              }{" "}
                              x
                              {
                                item.qty
                              }
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
                  </div>
                )}

              </div>
            )
          )}

          {filteredTransactions.length ===
            0 && (
            <div
              className="
                text-center
                text-slate-500
                py-12
              "
            >
              Tidak ada transaksi
            </div>
          )}

        </div>

      </div>
    </>
  );
}

function StatCard({
  label,
  value,
  highlight,
}) {
  return (
    <div
      className={`
        rounded-3xl
        p-4
        border

        ${
          highlight
            ? "bg-orange-500/10 border-orange-500/20"
            : "bg-[#1B2122] border-white/10"
        }
      `}
    >
      <p
        className="
          text-xs
          text-slate-400
        "
      >
        {label}
      </p>

      <h3
        className={`
          mt-2
          font-bold

          ${
            highlight
              ? "text-orange-400"
              : ""
          }
        `}
      >
        Rp{" "}
        {value.toLocaleString(
          "id-ID"
        )}
      </h3>
    </div>
  );
}

function InfoRow({
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        justify-between
        text-sm
      "
    >
      <span className="text-slate-500">
        {label}
      </span>

      <span>{value}</span>
    </div>
  );
}