import { z } from "zod";
import { channelSchema } from "@/features/inbox/schemas/conversation";

export const orderStatusSchema = z.enum([
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
]);

export const paymentMethodSchema = z.enum(["cod", "prepaid"]);

export const orderItemSchema = z.object({
  id: z.string(),
  productName: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const orderNoteSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.string(),
});

export const orderSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  customerName: z.string(),
  customerPhone: z.string(),
  address: z.string(),
  channel: channelSchema,
  status: orderStatusSchema,
  paymentMethod: paymentMethodSchema,
  courier: z.string().optional(),
  isHighRisk: z.boolean(),
  items: z.array(orderItemSchema),
  tags: z.array(z.string()),
  notes: z.array(orderNoteSchema),
  createdAt: z.string(),
});

export const orderListSchema = z.array(orderSchema);

export type OrderStatus = z.infer<typeof orderStatusSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
export type OrderNote = z.infer<typeof orderNoteSchema>;
export type Order = z.infer<typeof orderSchema>;
