import { z } from "zod";

export const overviewStatsSchema = z.object({
  todayOrders: z.number(),
  todayOrdersChangePct: z.number(),
  pendingConfirmation: z.number(),
  pendingConfirmationChangePct: z.number(),
  highRiskOrders: z.number(),
  highRiskOrdersChangePct: z.number(),
  returnRatePct: z.number(),
  returnRateChangePct: z.number(),
});

export const dailyOrderPointSchema = z.object({
  date: z.string(),
  orders: z.number(),
});

export const activityTypeSchema = z.enum(["order", "risk", "return", "message"]);

export const recentActivityItemSchema = z.object({
  id: z.string(),
  type: activityTypeSchema,
  title: z.string(),
  description: z.string(),
  timestamp: z.string(),
});

export const dashboardOverviewSchema = z.object({
  stats: overviewStatsSchema,
  dailyOrders: z.array(dailyOrderPointSchema),
  recentActivity: z.array(recentActivityItemSchema),
});

export type OverviewStats = z.infer<typeof overviewStatsSchema>;
export type DailyOrderPoint = z.infer<typeof dailyOrderPointSchema>;
export type ActivityType = z.infer<typeof activityTypeSchema>;
export type RecentActivityItem = z.infer<typeof recentActivityItemSchema>;
export type DashboardOverview = z.infer<typeof dashboardOverviewSchema>;
