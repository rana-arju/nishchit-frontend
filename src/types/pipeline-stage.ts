import { z } from "zod";

export const pipelineStageSchema = z.enum([
  "new",
  "contacted",
  "interested",
  "follow_up",
  "qualified",
  "order_confirmed",
  "lost",
]);

export type PipelineStage = z.infer<typeof pipelineStageSchema>;

export const PIPELINE_STAGES: PipelineStage[] = [
  "new",
  "contacted",
  "interested",
  "follow_up",
  "qualified",
  "order_confirmed",
  "lost",
];

export const pipelineStageLabel: Record<PipelineStage, string> = {
  new: "নতুন",
  contacted: "যোগাযোগ করা হয়েছে",
  interested: "আগ্রহী",
  follow_up: "ফলো-আপ",
  qualified: "সম্ভাবনাময়",
  order_confirmed: "অর্ডার নিশ্চিত",
  lost: "হারানো",
};
