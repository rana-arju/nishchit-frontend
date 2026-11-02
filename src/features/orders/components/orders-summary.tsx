import { AlertTriangle, Clock, PackageCheck, Truck, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Order } from "@/features/orders/schemas/order";
import { cn } from "cn";

function SummaryTile({
  label,
  value,
  icon: Icon,
  iconClassName,
}: {
  label: string;
  value: number;
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
          <p className="text-xl font-semibold tabular-nums">{value.toLocaleString("bn-BD")}</p>
          <p className="font-bangla text-muted-foreground text-xs">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function OrdersSummary({ orders }: { orders: Order[] }) {
  const pending = orders.filter((order) => order.status === "pending").length;
  const inTransit = orders.filter((order) => order.status === "shipped").length;
  const highRisk = orders.filter((order) => order.isHighRisk).length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <SummaryTile
        label="মোট অর্ডার"
        value={orders.length}
        icon={PackageCheck}
        iconClassName="bg-accent text-accent-foreground"
      />
      <SummaryTile
        label="নিশ্চিতকরণের অপেক্ষায়"
        value={pending}
        icon={Clock}
        iconClassName="bg-chart-3/15 text-chart-3"
      />
      <SummaryTile
        label="কুরিয়ারে পাঠানো হয়েছে"
        value={inTransit}
        icon={Truck}
        iconClassName="bg-chart-2/15 text-chart-2"
      />
      <SummaryTile
        label="উচ্চ ঝুঁকি"
        value={highRisk}
        icon={AlertTriangle}
        iconClassName="bg-destructive/10 text-destructive"
      />
    </div>
  );
}
