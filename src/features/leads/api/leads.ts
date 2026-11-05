import { apiFetch } from "@/lib/api-client";
import { leadListSchema, leadSchema, type Lead } from "@/features/leads/schemas/lead";
import type { PipelineStage } from "@/types/pipeline-stage";

interface ApiEnvelope<T> {
  data: T;
}

export async function fetchLeads(): Promise<Lead[]> {
  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/leads");
  return leadListSchema.parse(response.data);
}

export async function createLead(payload: {
  name: string;
  phone: string;
  source?: string;
  stage?: PipelineStage;
  tags?: string[];
}): Promise<Lead> {
  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return leadSchema.parse(response.data);
}

export async function updateLead(
  id: string,
  payload: { name: string; phone: string; source: string },
): Promise<Lead> {
  const response = await apiFetch<ApiEnvelope<unknown>>(`/api/v1/leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return leadSchema.parse(response.data);
}

export async function updateLeadStage(id: string, stage: PipelineStage): Promise<Lead> {
  const response = await apiFetch<ApiEnvelope<unknown>>(`/api/v1/leads/${id}/stage`, {
    method: "PATCH",
    body: JSON.stringify({ stage }),
  });
  return leadSchema.parse(response.data);
}

export async function updateLeadTags(id: string, tags: string[]): Promise<Lead> {
  const response = await apiFetch<ApiEnvelope<unknown>>(`/api/v1/leads/${id}/tags`, {
    method: "PUT",
    body: JSON.stringify({ tags }),
  });
  return leadSchema.parse(response.data);
}

export async function addLeadNote(id: string, text: string): Promise<Lead> {
  const response = await apiFetch<ApiEnvelope<unknown>>(`/api/v1/leads/${id}/notes`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  return leadSchema.parse(response.data);
}

export async function deleteLead(id: string): Promise<void> {
  await apiFetch(`/api/v1/leads/${id}`, { method: "DELETE" });
}
