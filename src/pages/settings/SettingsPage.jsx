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
  saveProducts,
  saveTransactions,
} from "../../services/storageService";

export default function SettingsPage() {
  const products = getProducts();
  const transactions = getTransactions();

  // EXPORT BACKUP
  const exportBackup = () => {
    const backup = {
      products: getProducts(),
      transactions: getTransactions(),
      createdAt: new Date().toISOString(),
    };

    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `umkm-backup-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  // IMPORT BACKUP
  const importBackup = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (data.products) saveProducts(data.products);
        if (data.transactions) saveTransactions(data.transactions);

        alert("Backup berhasil diimport");
        window.location.reload();
      } catch {
        alert("File backup tidak valid");
      }
    };

    reader.readAsText(file);
  };

  // RESET DATA
  const resetAllData = () => {
    const confirmReset = window.confirm("Hapus semua data aplikasi?");
    if (!confirmReset) return;

    saveProducts([]);
    saveTransactions([]);

    alert("Semua data berhasil dihapus");
    window.location.reload();
  };

  return (
    <>
      <TopBar title="Pengaturan" subtitle="Backup & Sistem" />

      <div className="p-4 space-y-4">

        <section className="bg-[#1B2122] border border-white/10 rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-orange-400" />
            <h2 className="font-semibold text-lg">Statistik Data</h2>
          </div>

          <div className="space-y-3">
            <StatRow label="Total Produk" value={products.length} />
            <StatRow label="Total Transaksi" value={transactions.length} />

            <StatRow
              label="Local Storage"
              value={`${(
                JSON.stringify(localStorage).length / 1024
              ).toFixed(2)} KB`}
            />
          </div>
        </section>

        <section className="bg-[#1B2122] border border-white/10 rounded-3xl p-5">
          <h2 className="font-semibold text-lg mb-4">Backup Data</h2>

          <button onClick={exportBackup} className="w-full p-4 bg-[#252C2F] rounded-2xl flex gap-3">
            <Download className="text-orange-400" />
            Export Backup JSON
          </button>

          <label className="w-full mt-3 p-4 bg-[#252C2F] rounded-2xl flex gap-3 cursor-pointer">
            <Upload className="text-orange-400" />
            Import Backup JSON
            <input hidden type="file" accept=".json" onChange={importBackup} />
          </label>
        </section>

        <section className="bg-[#1B2122] border border-red-500/20 rounded-3xl p-5">
          <h2 className="text-red-400 font-semibold text-lg mb-4">
            Danger Zone
          </h2>

          <button
            onClick={resetAllData}
            className="w-full p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex gap-3"
          >
            <Trash2 />
            Reset Semua Data
          </button>
        </section>

        <section className="bg-[#1B2122] border border-white/10 rounded-3xl p-5">
          <div className="flex gap-3 mb-3">
            <Info className="text-orange-400" />
            <h2 className="font-semibold">Informasi Aplikasi</h2>
          </div>

          <div className="text-sm text-slate-400 space-y-1">
            <p>UMKM POS System</p>
            <p>Version 1.0.0</p>
            <p>React + Vite</p>
          </div>
        </section>
      </div>
    </>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}