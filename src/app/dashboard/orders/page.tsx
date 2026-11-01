import { ClipboardList } from "lucide-react";
import { EmptyState } from "@/features/dashboard/components/empty-state";

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="text-muted-foreground text-sm">
          Orders captured from Messenger will show up here.
        </p>
      </div>
      <EmptyState
        icon={ClipboardList}
        title="No orders yet"
        description="Once Nishchit starts reading customer messages, confirmed and pending orders will appear in this list."
      />
    </div>
  );
}
