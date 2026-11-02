import { z } from "zod";
import { pipelineStageSchema } from "@/types/pipeline-stage";

export const leadNoteSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.string(),
});

export const leadSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  source: z.string(),
  stage: pipelineStageSchema,
  tags: z.array(z.string()),
  notes: z.array(leadNoteSchema),
  lastActivityAt: z.string(),
});

export const leadListSchema = z.array(leadSchema);

export type LeadNote = z.infer<typeof leadNoteSchema>;
export type Lead = z.infer<typeof leadSchema>;
