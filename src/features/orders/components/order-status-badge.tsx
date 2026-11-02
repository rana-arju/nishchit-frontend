import {
  CheckCircle2,
  Clock,
  PackageCheck,
  RotateCcw,
  Truck,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type { OrderStatus } from "@/features/orders/schemas/order";
import { cn } from "cn";

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
];

export const orderStatusLabel: Record<OrderStatus, string> = {
  pending: "নিশ্চিতকরণের অপেক্ষায়",
  confirmed: "নিশ্চিত",
  shipped: "কুরিয়ারে পাঠানো হয়েছে",
  delivered: "ডেলিভারি সম্পন্ন",
  cancelled: "বাতিল",
  returned: "ফেরত",
};

export const orderStatusIcon: Record<OrderStatus, LucideIcon> = {
  pending: Clock,
  confirmed: CheckCircle2,
  shipped: Truck,
  delivered: PackageCheck,
  cancelled: XCircle,
  returned: RotateCcw,
};

const orderStatusClassName: Record<OrderStatus, string> = {
  pending: "bg-chart-3/10 text-chart-3",
  confirmed: "bg-primary/10 text-primary",
  shipped: "bg-chart-2/10 text-chart-2",
  delivered: "bg-chart-4/10 text-chart-4",
  cancelled: "bg-destructive/10 text-destructive",
  returned: "bg-muted text-muted-foreground",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const Icon = orderStatusIcon[status];

  return (
    <span
      className={cn(
        "font-bangla inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        orderStatusClassName[status],
      )}
    >
      <Icon className="size-3.5" />
      {orderStatusLabel[status]}
    </span>
  );
}
