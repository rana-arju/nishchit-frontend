import { leadListSchema, type Lead } from "@/features/leads/schemas/lead";
import { mockLeads } from "@/features/leads/api/leads.mock";

export async function fetchLeads(): Promise<Lead[]> {
  return leadListSchema.parse(mockLeads);
}
