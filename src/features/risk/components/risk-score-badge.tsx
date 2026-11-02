import type { RiskLevel } from "@/features/risk/schemas/risk";
import { cn } from "cn";

export const riskLevelLabel: Record<RiskLevel, string> = {
  low: "কম ঝুঁকি",
  medium: "মাঝারি ঝুঁকি",
  high: "উচ্চ ঝুঁকি",
};

const riskLevelRingColor: Record<RiskLevel, string> = {
  low: "var(--chart-4)",
  medium: "var(--chart-3)",
  high: "var(--destructive)",
};

const riskLevelTextClassName: Record<RiskLevel, string> = {
  low: "text-chart-4",
  medium: "text-chart-3",
  high: "text-destructive",
};

export function RiskScoreBadge({
  score,
  level,
  size = "md",
}: {
  score: number;
  level: RiskLevel;
  size?: "sm" | "md";
}) {
  const dimension = size === "sm" ? 36 : 44;
  const stroke = size === "sm" ? 4 : 5;
  const radius = (dimension - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="relative shrink-0" style={{ width: dimension, height: dimension }}>
      <svg width={dimension} height={dimension} className="-rotate-90">
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={stroke}
        />
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke={riskLevelRingColor[level]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums",
          riskLevelTextClassName[level],
        )}
      >
        {score}
      </span>
    </div>
  );
}
