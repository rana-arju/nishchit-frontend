import { z } from "zod";
import { pipelineStageSchema } from "@/types/pipeline-stage";

export const channelSchema = z.enum(["messenger", "instagram", "whatsapp"]);

export const messageSenderSchema = z.enum(["customer", "agent", "ai"]);

export const conversationStatusSchema = z.enum(["open", "pending", "resolved"]);

export const messageSchema = z.object({
  id: z.string(),
  sender: messageSenderSchema,
  text: z.string(),
  timestamp: z.string(),
});

export const conversationNoteSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.string(),
});

export const conversationSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  channel: channelSchema,
  status: conversationStatusSchema,
  stage: pipelineStageSchema,
  tags: z.array(z.string()),
  notes: z.array(conversationNoteSchema),
  unreadCount: z.number(),
  lastMessagePreview: z.string(),
  lastMessageAt: z.string(),
  aiDraftReady: z.boolean(),
  aiDraft: z.string().optional(),
  messages: z.array(messageSchema),
});

export const conversationListSchema = z.array(conversationSchema);

export type Channel = z.infer<typeof channelSchema>;
export type MessageSender = z.infer<typeof messageSenderSchema>;
export type ConversationStatus = z.infer<typeof conversationStatusSchema>;
export type Message = z.infer<typeof messageSchema>;
export type ConversationNote = z.infer<typeof conversationNoteSchema>;
export type Conversation = z.infer<typeof conversationSchema>;
