import { conversationListSchema, type Conversation } from "@/features/inbox/schemas/conversation";
import { mockConversations } from "@/features/inbox/api/conversations.mock";

export async function fetchConversations(): Promise<Conversation[]> {
  return conversationListSchema.parse(mockConversations);
}
