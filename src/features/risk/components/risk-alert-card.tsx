import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChannelIcon } from "@/features/inbox/components/channel-icon";
import { RiskScoreBadge, riskLevelLabel } from "@/features/risk/components/risk-score-badge";
import type { RiskAlert } from "@/features/risk/schemas/risk";
import { cn } from "cn";

function formatRelativeTime(timestamp: string): string {
  const diffHours = Math.round((Date.now() - new Date(timestamp).getTime()) / 3_600_000);
  if (diffHours < 1) return "এইমাত্র";
  if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
  return `${Math.round(diffHours / 24)} দিন আগে`;
}

const riskLevelPillClassName = {
  low: "bg-chart-4/10 text-chart-4",
  medium: "bg-chart-3/10 text-chart-3",
  high: "bg-destructive/10 text-destructive",
} as const;

export function RiskAlertCard({
  alert,
  onConfirm,
  onCancel,
}: {
  alert: RiskAlert;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Card className="border-transparent shadow-sm ring-1">
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <RiskScoreBadge score={alert.riskScore} level={alert.riskLevel} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bangla text-sm font-semibold">{alert.customerName}</p>
            <span className="text-muted-foreground text-xs">{alert.orderNumber}</span>
            <ChannelIcon channel={alert.channel} branded className="size-3.5" />
            <span
              className={cn(
                "font-bangla rounded-full px-2 py-0.5 text-[11px] font-medium",
                riskLevelPillClassName[alert.riskLevel],
              )}
            >
              {riskLevelLabel[alert.riskLevel]}
            </span>
          </div>

          <p className="text-muted-foreground mt-0.5 text-xs">
            {alert.customerPhone} • ৳{alert.amount.toLocaleString("bn-BD")} •{" "}
            {formatRelativeTime(alert.createdAt)}
          </p>

          <ul className="font-bangla text-muted-foreground mt-2 flex flex-col gap-1 text-xs">
            {alert.reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-1.5">
                <span className="bg-muted-foreground mt-1.5 size-1 shrink-0 rounded-full" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {alert.status === "pending" ? (
          <div className="flex shrink-0 gap-2 sm:flex-col">
            <Button size="sm" className="font-bangla flex-1 sm:flex-none" onClick={onConfirm}>
              <CheckCircle2 className="size-3.5" />
              নিশ্চিত করুন ও পাঠান
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="font-bangla text-destructive flex-1 sm:flex-none"
              onClick={onCancel}
            >
              <XCircle className="size-3.5" />
              বাতিল করুন
            </Button>
          </div>
        ) : (
          <span
            className={cn(
              "font-bangla inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
              alert.status === "confirmed"
                ? "bg-chart-4/10 text-chart-4"
                : "bg-muted text-muted-foreground",
            )}
          >
            {alert.status === "confirmed" ? (
              <CheckCircle2 className="size-3.5" />
            ) : (
              <XCircle className="size-3.5" />
            )}
            {alert.status === "confirmed" ? "নিশ্চিত করা হয়েছে" : "বাতিল করা হয়েছে"}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
