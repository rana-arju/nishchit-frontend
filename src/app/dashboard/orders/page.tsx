import { OrdersView } from "@/features/orders/components/orders-view";

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="text-muted-foreground text-sm">
          Orders captured from Messenger will show up here.
        </p>
      </div>
      <OrdersView />
    </div>
  );
}
