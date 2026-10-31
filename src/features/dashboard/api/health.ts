import { apiFetch } from "@/lib/api-client";
import { healthStatusSchema, type HealthStatus } from "@/features/dashboard/schemas/health";

export async function fetchHealth(): Promise<HealthStatus> {
  const data = await apiFetch<unknown>("/api/v1/health");
  return healthStatusSchema.parse(data);
}
