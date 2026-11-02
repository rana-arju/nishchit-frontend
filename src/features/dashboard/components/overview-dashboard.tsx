"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AlertOctagon, ClipboardList, PackageCheck, Undo2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { fetchDashboardOverview } from "@/features/dashboard/api/overview";
import type { DashboardOverview } from "@/features/dashboard/schemas/overview";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { DailyOrdersChart } from "@/features/dashboard/components/daily-orders-chart";
import { RecentActivity } from "@/features/dashboard/components/recent-activity";

type State =
  { phase: "loading" } | { phase: "error" } | { phase: "ready"; data: DashboardOverview };

function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function OverviewDashboard() {
  const [state, setState] = useState<State>({ phase: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetchDashboardOverview()
      .then((data) => {
        if (!cancelled) setState({ phase: "ready", data });
      })
      .catch(() => {
        if (!cancelled) setState({ phase: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.phase === "loading") {
    return (
      <div className="flex flex-col gap-6">
        <StatsSkeleton />
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (state.phase === "error") {
    return (
      <Card>
        <CardContent>
          <p className="text-destructive font-bangla text-sm">
            ড্যাশবোর্ডের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করুন।
          </p>
        </CardContent>
      </Card>
    );
  }

  const { stats, dailyOrders, recentActivity } = state.data;

  const statCards = [
    {
      label: "আজকের অর্ডার",
      value: stats.todayOrders.toLocaleString("bn-BD"),
      changePct: stats.todayOrdersChangePct,
      icon: PackageCheck,
      iconClassName: "bg-accent text-accent-foreground",
      increaseIsGood: true,
    },
    {
      label: "নিশ্চিতকরণের অপেক্ষায়",
      value: stats.pendingConfirmation.toLocaleString("bn-BD"),
      changePct: stats.pendingConfirmationChangePct,
      icon: ClipboardList,
      iconClassName: "bg-chart-3/15 text-chart-3",
      increaseIsGood: false,
    },
    {
      label: "উচ্চ ঝুঁকি",
      value: stats.highRiskOrders.toLocaleString("bn-BD"),
      changePct: stats.highRiskOrdersChangePct,
      icon: AlertOctagon,
      iconClassName: "bg-destructive/10 text-destructive",
      increaseIsGood: false,
    },
    {
      label: "ফেরতের হার",
      value: `${stats.returnRatePct.toFixed(1)}%`,
      changePct: stats.returnRateChangePct,
      icon: Undo2,
      iconClassName: "bg-muted text-muted-foreground",
      increaseIsGood: false,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
          >
            <StatCard {...card} />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DailyOrdersChart data={dailyOrders} />
        </div>
        <RecentActivity items={recentActivity} />
      </div>
    </div>
  );
}
