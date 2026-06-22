import { Trophy, Package } from "lucide-react";
import { getTopProducts } from "../../services/analyticsService";

export default function DashboardTopProducts({ transactions }) {
  const topProducts = getTopProducts(transactions);

  const maxSold = Math.max(
    ...topProducts.map((p) => p.sold),
    1
  );

  const getRankStyle = (index) => {
    if (index === 0)
      return "bg-yellow-500/15 text-yellow-400 border-yellow-500/20";
    if (index === 1)
      return "bg-slate-500/15 text-slate-300 border-slate-500/20";
    if (index === 2)
      return "bg-orange-700/15 text-orange-400 border-orange-700/20";
    return "bg-white/5 text-slate-400 border-white/10";
  };

  return (
    <section className="bg-[#1B2122] border border-white/10 rounded-3xl p-5">

      <div className="flex justify-between mb-6">

        <div>
          <p className="text-sm text-slate-400">Analytics</p>
          <h3 className="text-xl font-bold mt-1">Produk Terlaris</h3>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
          <Trophy className="text-orange-400" />
        </div>

      </div>

      {topProducts.length === 0 ? (
        <div className="py-12 text-center text-slate-500">
          Belum ada data penjualan
        </div>
      ) : (
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={product.id} className="bg-[#252C2F] rounded-2xl p-4">

              <div className="flex justify-between mb-3">

                <div className="flex gap-3 items-center">

                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold ${getRankStyle(index)}`}>
                    #{index + 1}
                  </div>

                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-xs text-slate-500">
                      Rp {product.revenue.toLocaleString("id-ID")}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-2 text-orange-400">
                  <Package size={16} />
                  <span className="font-bold">{product.sold}</span>
                </div>

              </div>

              <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-orange-600 to-orange-400"
                  style={{
                    width: `${(product.sold / maxSold) * 100}%`,
                  }}
                />
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
}