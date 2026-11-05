import { apiFetch } from "@/lib/api-client";
import {
  orderListSchema,
  orderSchema,
  type Order,
  type OrderStatus,
  type PaymentMethod,
} from "@/features/orders/schemas/order";

interface ApiEnvelope<T> {
  data: T;
}

export interface OrderItemInput {
  productName: string;
  quantity: number;
  price: number;
}

export async function fetchOrders(): Promise<Order[]> {
  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/orders");
  return orderListSchema.parse(response.data);
}

export async function createOrder(payload: {
  customerName: string;
  customerPhone: string;
  address: string;
  channel?: string;
  paymentMethod?: PaymentMethod;
  courier?: string | null;
  isHighRisk?: boolean;
  tags?: string[];
  items: OrderItemInput[];
}): Promise<Order> {
  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return orderSchema.parse(response.data);
}

export async function updateOrder(
  id: string,
  payload: {
    customerName: string;
    customerPhone: string;
    address: string;
    channel: string;
    paymentMethod: PaymentMethod;
    courier: string | null;
    isHighRisk: boolean;
    items: OrderItemInput[];
  },
): Promise<Order> {
  const response = await apiFetch<ApiEnvelope<unknown>>(`/api/v1/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return orderSchema.parse(response.data);
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  const response = await apiFetch<ApiEnvelope<unknown>>(`/api/v1/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return orderSchema.parse(response.data);
}

export async function updateOrderTags(id: string, tags: string[]): Promise<Order> {
  const response = await apiFetch<ApiEnvelope<unknown>>(`/api/v1/orders/${id}/tags`, {
    method: "PUT",
    body: JSON.stringify({ tags }),
  });
  return orderSchema.parse(response.data);
}

export async function addOrderNote(id: string, text: string): Promise<Order> {
  const response = await apiFetch<ApiEnvelope<unknown>>(`/api/v1/orders/${id}/notes`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  return orderSchema.parse(response.data);
}

export async function deleteOrder(id: string): Promise<void> {
  await apiFetch(`/api/v1/orders/${id}`, { method: "DELETE" });
}
