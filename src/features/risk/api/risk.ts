import { riskDataSchema, type RiskData } from "@/features/risk/schemas/risk";
import { mockRiskData } from "@/features/risk/api/risk.mock";

export async function fetchRiskData(): Promise<RiskData> {
  return riskDataSchema.parse(mockRiskData);
}
