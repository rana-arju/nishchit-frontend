import { z } from "zod";
import { channelSchema } from "@/features/inbox/schemas/conversation";

export const riskLevelSchema = z.enum(["low", "medium", "high"]);

export const riskAlertStatusSchema = z.enum(["pending", "confirmed", "cancelled"]);

export const riskAlertSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  customerName: z.string(),
  customerPhone: z.string(),
  channel: channelSchema,
  amount: z.number(),
  riskScore: z.number(),
  riskLevel: riskLevelSchema,
  reasons: z.array(z.string()),
  status: riskAlertStatusSchema,
  createdAt: z.string(),
});

export const returnReasonCategorySchema = z.enum([
  "size_issue",
  "changed_mind",
  "damaged",
  "not_as_described",
  "other",
]);

export const returnRecordSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  customerName: z.string(),
  productName: z.string(),
  reasonCategory: returnReasonCategorySchema,
  reasonNote: z.string(),
  amount: z.number(),
  returnedAt: z.string(),
});

export const riskDataSchema = z.object({
  alerts: z.array(riskAlertSchema),
  returns: z.array(returnRecordSchema),
});

export type RiskLevel = z.infer<typeof riskLevelSchema>;
export type RiskAlertStatus = z.infer<typeof riskAlertStatusSchema>;
export type RiskAlert = z.infer<typeof riskAlertSchema>;
export type ReturnReasonCategory = z.infer<typeof returnReasonCategorySchema>;
export type ReturnRecord = z.infer<typeof returnRecordSchema>;
export type RiskData = z.infer<typeof riskDataSchema>;
