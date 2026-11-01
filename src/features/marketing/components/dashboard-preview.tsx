import { ArrowDownRight, ArrowUpRight, CheckCircle2, CircleAlert, ShoppingBag } from "lucide-react";

type DashboardData = {
  readonly totalOrders: string;
  readonly totalOrdersChange: string;
  readonly confirmed: string;
  readonly confirmedChange: string;
  readonly atRisk: string;
  readonly atRiskChange: string;
  readonly returnRate: string;
  readonly returnRateChange: string;
};

export function DashboardPreview({ dashboard }: { dashboard: DashboardData }) {
  const cards = [
    {
      label: "Total orders",
      value: dashboard.totalOrders,
      change: dashboard.totalOrdersChange,
      icon: ShoppingBag,
      tone: "text-violet-600 bg-violet-50 dark:bg-violet-500/15 dark:text-violet-300",
      trend: "up",
    },
    {
      label: "Confirmed",
      value: dashboard.confirmed,
      change: dashboard.confirmedChange,
      icon: CheckCircle2,
      tone: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/15 dark:text-emerald-300",
      trend: "up",
    },
    {
      label: "At risk",
      value: dashboard.atRisk,
      change: dashboard.atRiskChange,
      icon: CircleAlert,
      tone: "text-amber-600 bg-amber-50 dark:bg-amber-500/15 dark:text-amber-300",
      trend: "down",
    },
  ] as const;

  return (
    <div className="relative mx-auto max-w-2xl">
      <div
        className="absolute -inset-8 -z-10 rounded-full bg-violet-300/35 blur-3xl dark:bg-violet-600/20"
        aria-hidden="true"
      />
      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-2 shadow-[0_28px_70px_rgba(79,70,229,0.15)] sm:p-3 dark:border-white/15 dark:bg-slate-900 dark:shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
        <div className="overflow-hidden rounded-[1.25rem] bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-white">
                N
              </span>
              <span className="text-sm font-semibold">Order overview</span>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 sm:text-xs dark:bg-emerald-500/15 dark:text-emerald-300">
              Live
            </span>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
              {cards.map((card, index) => {
                const Icon = card.icon;
                const TrendIcon = card.trend === "up" ? ArrowUpRight : ArrowDownRight;

                return (
                  <div
                    key={card.label}
                    className={`rounded-xl border border-slate-200 bg-white p-3 sm:p-4 dark:border-slate-800 dark:bg-slate-900 ${index === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <div className={`grid size-7 place-items-center rounded-lg ${card.tone}`}>
                      <Icon className="size-3.5" aria-hidden="true" />
                    </div>
                    <p className="mt-3 text-[10px] font-medium text-slate-500 sm:text-xs dark:text-slate-400">
                      {card.label}
                    </p>
                    <div className="mt-0.5 flex items-end justify-between gap-2">
                      <p className="text-lg font-bold tracking-tight sm:text-2xl">{card.value}</p>
                      <span className="flex items-center text-[9px] font-semibold text-emerald-600 sm:text-[10px]">
                        <TrendIcon className="size-3" aria-hidden="true" />
                        {card.change.replace(/\s/g, "")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold">Orders processed</p>
                  <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                    Last 30 days
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-rose-600">{dashboard.returnRate}</p>
                  <p className="text-[9px] font-medium text-slate-500">return rate</p>
                </div>
              </div>
              <svg
                className="mt-4 h-24 w-full"
                viewBox="0 0 520 100"
                preserveAspectRatio="none"
                role="img"
                aria-label="Orders trend increasing over 30 days"
              >
                <defs>
                  <linearGradient id="orders-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 82 C58 76 80 68 130 70 S210 42 270 50 S360 24 410 34 S475 18 520 12 V100 H0Z"
                  fill="url(#orders-fill)"
                />
                <path
                  d="M0 82 C58 76 80 68 130 70 S210 42 270 50 S360 24 410 34 S475 18 520 12"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
