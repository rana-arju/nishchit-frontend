"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DailyOrderPoint } from "@/features/dashboard/schemas/overview";

type DailyOrdersChartProps = {
  data: DailyOrderPoint[];
};

function formatDayLabel(date: string): string {
  return new Date(date).toLocaleDateString("bn-BD", { day: "numeric", month: "short" });
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number; payload: DailyOrderPoint }[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;

  return (
    <div className="bg-popover text-popover-foreground ring-foreground/10 rounded-lg px-3 py-2 text-xs shadow-md ring-1">
      <p className="text-muted-foreground">{formatDayLabel(point.date)}</p>
      <p className="font-semibold">{point.orders} অর্ডার</p>
    </div>
  );
}

export function DailyOrdersChart({ data }: DailyOrdersChartProps) {
  const total = data.reduce((sum, point) => sum + point.orders, 0);
  const average = data.length > 0 ? Math.round(total / data.length) : 0;

  return (
    <Card className="border-transparent shadow-sm ring-1">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="font-bangla">প্রতিদিনের অর্ডার</CardTitle>
          <p className="text-muted-foreground font-bangla mt-1 text-xs">
            গত {data.length} দিনের প্রবণতা
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold tabular-nums">{total.toLocaleString("bn-BD")}</p>
          <p className="text-muted-foreground font-bangla text-xs">
            গড় {average.toLocaleString("bn-BD")}/দিন
          </p>
        </div>
      </CardHeader>
      <CardContent className="h-72 px-2 sm:px-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="daily-orders-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDayLabel}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              minTickGap={24}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#daily-orders-fill)"
              activeDot={{ r: 4, strokeWidth: 0 }}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
