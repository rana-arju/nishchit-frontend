import {
  dashboardOverviewSchema,
  type DashboardOverview,
} from "@/features/dashboard/schemas/overview";
import { mockDashboardOverview } from "@/features/dashboard/api/overview.mock";

export async function fetchDashboardOverview(): Promise<DashboardOverview> {
  return dashboardOverviewSchema.parse(mockDashboardOverview);
}
