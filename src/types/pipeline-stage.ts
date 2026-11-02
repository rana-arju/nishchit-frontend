import { z } from "zod";

export const pipelineStageSchema = z.enum(["new", "contacted", "qualified", "lost"]);

export type PipelineStage = z.infer<typeof pipelineStageSchema>;

export const PIPELINE_STAGES: PipelineStage[] = ["new", "contacted", "qualified", "lost"];

export const pipelineStageLabel: Record<PipelineStage, string> = {
  new: "নতুন",
  contacted: "যোগাযোগ করা হয়েছে",
  qualified: "সম্ভাবনাময়",
  lost: "হারানো",
};
