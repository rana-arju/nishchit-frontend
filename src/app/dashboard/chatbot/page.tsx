import { ChatbotSettings } from "@/features/dashboard/components/chatbot-settings";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI Chatbot</h1>
        <p className="text-muted-foreground text-sm">
          Control how the AI assistant talks to customers and answers from your catalog.
        </p>
      </div>
      <ChatbotSettings />
    </div>
  );
}
