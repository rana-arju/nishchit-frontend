import { Sparkles } from "lucide-react";
import { TagPill } from "@/components/shared/tag-pill";
import { ConversationAvatar } from "@/features/inbox/components/conversation-avatar";
import type { Conversation } from "@/features/inbox/schemas/conversation";
import { cn } from "cn";

function formatTime(timestamp: string): string {
  const diffMinutes = Math.round((Date.now() - new Date(timestamp).getTime()) / 60_000);
  if (diffMinutes < 1) return "এখন";
  if (diffMinutes < 60) return `${diffMinutes}মি`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}ঘ`;
  return `${Math.round(diffHours / 24)}দিন`;
}

export function ConversationListItem({
  conversation,
  active,
  onSelect,
}: {
  conversation: Conversation;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-start gap-3 border-l-2 px-3 py-3 text-left transition-colors",
        active ? "border-primary bg-accent/60" : "hover:bg-muted/60 border-transparent",
      )}
    >
      <ConversationAvatar name={conversation.customerName} channel={conversation.channel} />

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-bangla truncate text-sm font-semibold">{conversation.customerName}</p>
          <span className="text-muted-foreground shrink-0 text-[11px]">
            {formatTime(conversation.lastMessageAt)}
          </span>
        </div>
        <p
          className={cn(
            "font-bangla truncate text-xs",
            conversation.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground",
          )}
        >
          {conversation.lastMessagePreview}
        </p>
        {(conversation.aiDraftReady || conversation.tags.length > 0) && (
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            {conversation.aiDraftReady && (
              <span className="text-primary inline-flex items-center gap-1 text-[11px] font-medium">
                <Sparkles className="size-3" />
                AI রিপ্লাই প্রস্তুত
              </span>
            )}
            {conversation.tags.slice(0, 1).map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>

      {conversation.unreadCount > 0 && (
        <span className="bg-primary text-primary-foreground mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-semibold">
          {conversation.unreadCount}
        </span>
      )}
    </button>
  );
}
