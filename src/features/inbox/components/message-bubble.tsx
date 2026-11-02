import { Sparkles } from "lucide-react";
import type { Message } from "@/features/inbox/schemas/conversation";
import { cn } from "cn";

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" });
}

export function MessageBubble({ message }: { message: Message }) {
  const isCustomer = message.sender === "customer";

  return (
    <div className={cn("flex flex-col gap-1", isCustomer ? "items-start" : "items-end")}>
      <div
        className={cn(
          "font-bangla max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed sm:max-w-[65%]",
          isCustomer
            ? "bg-muted text-foreground rounded-bl-sm"
            : "bg-primary text-primary-foreground rounded-br-sm",
        )}
      >
        {message.text}
      </div>
      <div className="text-muted-foreground flex items-center gap-1 px-1 text-[11px]">
        {message.sender === "ai" && (
          <span className="text-primary inline-flex items-center gap-0.5">
            <Sparkles className="size-3" />
            AI
          </span>
        )}
        {formatTime(message.timestamp)}
      </div>
    </div>
  );
}
