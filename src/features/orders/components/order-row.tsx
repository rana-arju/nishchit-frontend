import { AlertTriangle, ChevronRight } from "lucide-react";
import { OrderChannelIcon } from "@/features/orders/components/order-channel-icon";
import { OrderStatusBadge } from "@/features/orders/components/order-status-badge";
import type { Order } from "@/features/orders/schemas/order";
import { cn } from "cn";

function formatRelativeTime(timestamp: string): string {
  const diffHours = Math.round((Date.now() - new Date(timestamp).getTime()) / 3_600_000);
  if (diffHours < 1) return "এইমাত্র";
  if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
  return `${Math.round(diffHours / 24)} দিন আগে`;
}

function orderTotal(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function OrderRow({ order, onClick }: { order: Order; onClick: () => void }) {
  const total = orderTotal(order);
  const itemsSummary =
    order.items.length === 1
      ? order.items[0].productName
      : `${order.items[0].productName} +${order.items.length - 1} আরও`;

  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:bg-muted/50 flex w-full flex-col gap-2 px-4 py-3 text-left transition-colors md:grid md:grid-cols-[1.3fr_1.3fr_0.8fr_1fr_1.3fr_0.7fr_auto] md:items-center md:gap-4"
    >
      <div className="flex min-w-0 items-center gap-2">
        <OrderChannelIcon channel={order.channel} branded className="size-4 shrink-0" />
        <div className="min-w-0">
          <p className="font-bangla truncate text-sm font-semibold">{order.customerName}</p>
          <p className="text-muted-foreground truncate text-xs">{order.orderNumber}</p>
        </div>
      </div>

      <p className="font-bangla text-muted-foreground truncate text-xs md:text-sm">
        {itemsSummary}
      </p>

      <p className="text-sm font-semibold tabular-nums">৳{total.toLocaleString("bn-BD")}</p>

      <div className="flex items-center gap-1.5">
        <span className="font-bangla bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[11px] font-medium">
          {order.paymentMethod === "cod" ? "ক্যাশ অন ডেলিভারি" : "অগ্রিম পরিশোধ"}
        </span>
        {order.isHighRisk && (
          <span title="উচ্চ ঝুঁকিপূর্ণ কাস্টমার">
            <AlertTriangle className="text-destructive size-3.5 shrink-0" />
          </span>
        )}
      </div>

      <div>
        <OrderStatusBadge status={order.status} />
      </div>

      <p className="text-muted-foreground text-xs whitespace-nowrap">
        {formatRelativeTime(order.createdAt)}
      </p>

      <ChevronRight className={cn("text-muted-foreground hidden size-4 md:block")} />
    </button>
  );
}
