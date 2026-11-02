import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "cn";

type Trend = "up-good" | "up-bad" | "down-good" | "down-bad" | "flat";

type StatCardProps = {
  label: string;
  value: string;
  changePct: number;
  icon: LucideIcon;
  iconClassName?: string;
  /** Whether an increase in this metric is good or bad for the business. */
  increaseIsGood: boolean;
};

function resolveTrend(changePct: number, increaseIsGood: boolean): Trend {
  if (changePct === 0) return "flat";
  const isUp = changePct > 0;
  const isGood = isUp === increaseIsGood;
  if (isUp) return isGood ? "up-good" : "up-bad";
  return isGood ? "down-good" : "down-bad";
}

const trendPillStyles: Record<Trend, string> = {
  "up-good": "bg-chart-4/15 text-chart-4",
  "down-good": "bg-chart-4/15 text-chart-4",
  "up-bad": "bg-destructive/10 text-destructive",
  "down-bad": "bg-destructive/10 text-destructive",
  flat: "bg-muted text-muted-foreground",
};

export function StatCard({
  label,
  value,
  changePct,
  icon: Icon,
  iconClassName,
  increaseIsGood,
}: StatCardProps) {
  const trend = resolveTrend(changePct, increaseIsGood);
  const isUp = changePct > 0;
  const TrendIcon = changePct === 0 ? Minus : isUp ? ArrowUpRight : ArrowDownRight;

  return (
    <Card
      size="sm"
      className="group gap-2.5 border-transparent shadow-sm ring-1 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:gap-4"
    >
      <CardContent className="flex flex-col gap-2 sm:gap-3">
        <div className="flex items-start justify-between gap-2">
          <p className="font-bangla text-muted-foreground min-w-0 truncate text-xs font-medium sm:text-sm">
            {label}
          </p>
          <div
            className={cn(
              "shrink-0 rounded-lg p-1.5 ring-1 ring-black/5 transition-transform duration-300 ring-inset group-hover:scale-105 sm:rounded-xl sm:p-2.5",
              iconClassName,
            )}
          >
            <Icon className="size-4 sm:size-5" />
          </div>
        </div>
        <p className="text-xl font-semibold tracking-tight tabular-nums sm:text-3xl">{value}</p>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold sm:px-2 sm:text-xs",
              trendPillStyles[trend],
            )}
          >
            <TrendIcon className="size-3 sm:size-3.5" />
            {Math.abs(changePct).toFixed(1)}%
          </span>
          <span className="font-bangla text-muted-foreground hidden text-xs sm:inline">
            গতকালের তুলনায়
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
