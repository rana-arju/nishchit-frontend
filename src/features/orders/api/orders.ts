import { orderListSchema, type Order } from "@/features/orders/schemas/order";
import { mockOrders } from "@/features/orders/api/orders.mock";

export async function fetchOrders(): Promise<Order[]> {
  return orderListSchema.parse(mockOrders);
}
