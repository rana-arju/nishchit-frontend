"use client";

import { ShieldAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { fetchRiskData } from "@/features/risk/api/risk";
import { RiskAlertCard } from "@/features/risk/components/risk-alert-card";
import { RiskSummary } from "@/features/risk/components/risk-summary";
import { ReturnRecordRow } from "@/features/risk/components/return-record-row";
import type { RiskAlertStatus, RiskData } from "@/features/risk/schemas/risk";
import { cn } from "cn";

type State = { phase: "loading" } | { phase: "error" } | { phase: "ready"; data: RiskData };

const STATUS_FILTERS: { key: "all" | RiskAlertStatus; label: string }[] = [
  { key: "pending", label: "পর্যালোচনার অপেক্ষায়" },
  { key: "all", label: "সব" },
  { key: "confirmed", label: "নিশ্চিত করা হয়েছে" },
  { key: "cancelled", label: "বাতিল করা হয়েছে" },
];

export function RiskView() {
  const [state, setState] = useState<State>({ phase: "loading" });
  const [activeTab, setActiveTab] = useState<"alerts" | "returns">("alerts");
  const [statusFilter, setStatusFilter] = useState<"all" | RiskAlertStatus>("pending");

  useEffect(() => {
    let cancelled = false;

    fetchRiskData()
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

  const alerts = state.phase === "ready" ? state.data.alerts : [];
  const returns = state.phase === "ready" ? state.data.returns : [];

  const filteredAlerts = useMemo(() => {
    const source = state.phase === "ready" ? state.data.alerts : [];
    return statusFilter === "all"
      ? source
      : source.filter((alert) => alert.status === statusFilter);
  }, [state, statusFilter]);

  function updateAlertStatus(id: string, status: RiskAlertStatus) {
    setState((current) =>
      current.phase === "ready"
        ? {
            ...current,
            data: {
              ...current.data,
              alerts: current.data.alerts.map((alert) =>
                alert.id === id ? { ...alert, status } : alert,
              ),
            },
          }
        : current,
    );
  }

  if (state.phase === "loading") {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (state.phase === "error") {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Could not load risk data"
        description="Something went wrong while fetching risk alerts. Please try again shortly."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <RiskSummary alerts={alerts} returns={returns} />

      <div className="flex gap-2 border-b">
        <button
          type="button"
          onClick={() => setActiveTab("alerts")}
          className={cn(
            "font-bangla border-b-2 px-1 pb-2 text-sm font-medium transition-colors",
            activeTab === "alerts"
              ? "border-primary text-primary"
              : "text-muted-foreground hover:text-foreground border-transparent",
          )}
        >
          ঝুঁকিপূর্ণ অর্ডার
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("returns")}
          className={cn(
            "font-bangla border-b-2 px-1 pb-2 text-sm font-medium transition-colors",
            activeTab === "returns"
              ? "border-primary text-primary"
              : "text-muted-foreground hover:text-foreground border-transparent",
          )}
        >
          রিটার্ন হিস্ট্রি
        </button>
      </div>

      {activeTab === "alerts" ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setStatusFilter(filter.key)}
                className={cn(
                  "font-bangla rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  statusFilter === filter.key
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {filteredAlerts.length === 0 ? (
            <EmptyState
              icon={ShieldAlert}
              title="No risk alerts"
              description="Nothing to review in this filter right now."
            />
          ) : (
            <div className="scrollbar-hidden flex h-[60vh] min-h-96 flex-col gap-3 overflow-y-auto pr-1">
              {filteredAlerts.map((alert) => (
                <RiskAlertCard
                  key={alert.id}
                  alert={alert}
                  onConfirm={() => updateAlertStatus(alert.id, "confirmed")}
                  onCancel={() => updateAlertStatus(alert.id, "cancelled")}
                />
              ))}
            </div>
          )}
        </div>
      ) : returns.length === 0 ? (
        <EmptyState
          icon={ShieldAlert}
          title="No returns yet"
          description="Returned orders will show up here with the reason customers gave."
        />
      ) : (
        <Card className="divide-border flex h-[60vh] min-h-96 flex-col gap-0 divide-y overflow-hidden border-transparent p-0 shadow-sm ring-1">
          <div className="text-muted-foreground font-bangla hidden grid-cols-[1.3fr_1.3fr_1fr_0.8fr_0.8fr] gap-4 border-b px-4 py-2 text-xs font-medium md:grid">
            <span>কাস্টমার</span>
            <span>পণ্য</span>
            <span>কারণ</span>
            <span>মূল্য</span>
            <span>সময়</span>
          </div>
          <div className="scrollbar-hidden divide-border min-h-0 flex-1 divide-y overflow-y-auto">
            {returns.map((record) => (
              <ReturnRecordRow key={record.id} record={record} />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
