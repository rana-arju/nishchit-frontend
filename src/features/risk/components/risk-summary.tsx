import { AlertOctagon, Clock, RotateCcw, Wallet, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { RiskAlert, ReturnRecord } from "@/features/risk/schemas/risk";
import { cn } from "cn";

function SummaryTile({
  label,
  value,
  icon: Icon,
  iconClassName,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  iconClassName: string;
}) {
  return (
    <Card size="sm" className="border-transparent shadow-sm ring-1">
      <CardContent className="flex items-center gap-3">
        <div className={cn("rounded-xl p-2.5 ring-1 ring-black/5 ring-inset", iconClassName)}>
          <Icon className="size-4.5" />
        </div>
        <div>
          <p className="text-xl font-semibold tabular-nums">{value}</p>
          <p className="font-bangla text-muted-foreground text-xs">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function RiskSummary({ alerts, returns }: { alerts: RiskAlert[]; returns: ReturnRecord[] }) {
  const pending = alerts.filter((alert) => alert.status === "pending");
  const highRisk = pending.filter((alert) => alert.riskLevel === "high").length;
  const returnedAmount = returns.reduce((sum, record) => sum + record.amount, 0);

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <SummaryTile
        label="পর্যালোচনার অপেক্ষায়"
        value={pending.length.toLocaleString("bn-BD")}
        icon={Clock}
        iconClassName="bg-chart-3/15 text-chart-3"
      />
      <SummaryTile
        label="উচ্চ ঝুঁকিপূর্ণ অর্ডার"
        value={highRisk.toLocaleString("bn-BD")}
        icon={AlertOctagon}
        iconClassName="bg-destructive/10 text-destructive"
      />
      <SummaryTile
        label="মোট ফেরত"
        value={returns.length.toLocaleString("bn-BD")}
        icon={RotateCcw}
        iconClassName="bg-muted text-muted-foreground"
      />
      <SummaryTile
        label="ফেরতের মূল্য"
        value={`৳${returnedAmount.toLocaleString("bn-BD")}`}
        icon={Wallet}
        iconClassName="bg-accent text-accent-foreground"
      />
    </div>
  );
}
