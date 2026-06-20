import TopBar from "../../components/layout/TopBar";

import {
  Download,
  Upload,
  Trash2,
  Database,
  Info,
} from "lucide-react";

import {
  getProducts,
  getTransactions,
} from "../../utils/storage";

export default function SettingsPage() {
  const products =
    getProducts();

  const transactions =
    getTransactions();

  const exportBackup =
    () => {
      const backup = {
        products:
          JSON.parse(
            localStorage.getItem(
              "products"
            )
          ) || [],

        transactions:
          JSON.parse(
            localStorage.getItem(
              "transactions"
            )
          ) || [],

        createdAt:
          new Date().toISOString(),
      };

      const blob =
        new Blob(
          [
            JSON.stringify(
              backup,
              null,
              2
            ),
          ],
          {
            type:
              "application/json",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const a =
        document.createElement(
          "a"
        );

      a.href = url;

      a.download = `umkm-backup-${Date.now()}.json`;

      a.click();

      URL.revokeObjectURL(
        url
      );
    };

  const importBackup =
    (event) => {
      const file =
        event.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onload =
        (e) => {
          try {
            const data =
              JSON.parse(
                e.target.result
              );

            if (
              data.products
            ) {
              localStorage.setItem(
                "products",
                JSON.stringify(
                  data.products
                )
              );
            }

            if (
              data.transactions
            ) {
              localStorage.setItem(
                "transactions",
                JSON.stringify(
                  data.transactions
                )
              );
            }

            alert(
              "Backup berhasil diimport"
            );

            window.location.reload();
          } catch {
            alert(
              "File backup tidak valid"
            );
          }
        };

      reader.readAsText(
        file
      );
    };

  const resetAllData =
    () => {
      const confirmReset =
        window.confirm(
          "Hapus semua data aplikasi?"
        );

      if (
        !confirmReset
      )
        return;

      localStorage.clear();

      alert(
        "Semua data berhasil dihapus"
      );

      window.location.reload();
    };

  return (
    <>
      <TopBar
        title="Pengaturan"
        subtitle="Backup & Sistem"
      />

      <div className="p-4 space-y-4">

        {/* Statistik */}

        <section
          className="
            bg-[#1B2122]
            border border-white/10
            rounded-3xl
            p-5
          "
        >
          <div className="flex items-center gap-3 mb-4">
            <Database
              className="text-orange-400"
            />

            <h2 className="font-semibold text-lg">
              Statistik Data
            </h2>
          </div>

          <div className="space-y-3">

            <StatRow
              label="Total Produk"
              value={
                products.length
              }
            />

            <StatRow
              label="Total Transaksi"
              value={
                transactions.length
              }
            />

            <StatRow
              label="Local Storage"
              value={`${(
                JSON.stringify(
                  localStorage
                ).length /
                1024
              ).toFixed(
                2
              )} KB`}
            />

          </div>
        </section>

        {/* Backup */}

        <section
          className="
            bg-[#1B2122]
            border border-white/10
            rounded-3xl
            p-5
          "
        >
          <h2
            className="
              font-semibold
              text-lg
              mb-4
            "
          >
            Backup Data
          </h2>

          <div className="space-y-3">

            <button
              onClick={
                exportBackup
              }
              className="
                w-full
                p-4

                rounded-2xl

                bg-[#252C2F]

                flex
                items-center
                gap-3

                hover:border-orange-500/20

                transition
              "
            >
              <Download
                size={20}
                className="
                  text-orange-400
                "
              />

              Export Backup JSON
            </button>

            <label
              className="
                w-full
                p-4

                rounded-2xl

                bg-[#252C2F]

                flex
                items-center
                gap-3

                cursor-pointer
              "
            >
              <Upload
                size={20}
                className="
                  text-orange-400
                "
              />

              Import Backup JSON

              <input
                hidden
                type="file"
                accept=".json"
                onChange={
                  importBackup
                }
              />
            </label>

          </div>
        </section>

        {/* Danger Zone */}

        <section
          className="
            bg-[#1B2122]
            border border-red-500/20
            rounded-3xl
            p-5
          "
        >
          <h2
            className="
              text-red-400
              font-semibold
              text-lg
              mb-4
            "
          >
            Danger Zone
          </h2>

          <button
            onClick={
              resetAllData
            }
            className="
              w-full

              p-4

              rounded-2xl

              bg-red-500/10
              border
              border-red-500/20

              text-red-400

              flex
              items-center
              gap-3
            "
          >
            <Trash2
              size={18}
            />

            Reset Semua Data
          </button>
        </section>

        {/* Info */}

        <section
          className="
            bg-[#1B2122]
            border border-white/10
            rounded-3xl
            p-5
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <Info
              className="text-orange-400"
            />

            <h2 className="font-semibold">
              Informasi Aplikasi
            </h2>
          </div>

          <div className="space-y-2 text-sm text-slate-400">
            <p>
              UMKM POS System
            </p>

            <p>
              Version 1.0.0
            </p>

            <p>
              React + Vite
            </p>

            <p>
              Tailwind CSS
            </p>

            <p>
              Local Storage Mode
            </p>
          </div>
        </section>

      </div>
    </>
  );
}

function StatRow({
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        justify-between
      "
    >
      <span className="text-slate-400">
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}