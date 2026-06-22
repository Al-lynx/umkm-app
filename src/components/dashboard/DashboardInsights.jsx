import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Package,
} from "lucide-react";

import { getDashboardInsights } from "../../services/analyticsService";

export default function DashboardInsights({ transactions, products }) {
  const insights = getDashboardInsights(transactions, products);

  const iconMap = {
    bestSeller: TrendingUp,
    lowStock: AlertTriangle,
    bestDay: Lightbulb,
    totalProduct: Package,
  };

  return (
    <section className="bg-[#1B2122] border border-white/10 rounded-3xl p-5">
      <div className="mb-5">
        <p className="text-sm text-slate-400">Smart Analytics</p>
        <h3 className="mt-1 text-xl font-bold">Insight Bisnis</h3>
      </div>

      <div className="space-y-4">
        {insights.map((item) => {
          const Icon = iconMap[item.type];

          return (
            <div
              key={item.title}
              className="flex items-center gap-4 bg-[#252C2F] rounded-2xl p-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                <Icon className="text-orange-400" />
              </div>

              <div>
                <p className="text-xs text-slate-500">{item.title}</p>
                <h4 className="mt-1 font-semibold">{item.value}</h4>
                <p className="mt-1 text-xs text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}