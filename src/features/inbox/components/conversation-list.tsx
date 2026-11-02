"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { ConversationListItem } from "@/features/inbox/components/conversation-list-item";
import type { Conversation } from "@/features/inbox/schemas/conversation";
import { cn } from "cn";

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  className,
}: {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return conversations;
    return conversations.filter(
      (conversation) =>
        conversation.customerName.toLowerCase().includes(normalized) ||
        conversation.lastMessagePreview.toLowerCase().includes(normalized),
    );
  }, [conversations, query]);

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div className="relative shrink-0 border-b p-3">
        <Search className="text-muted-foreground absolute top-1/2 left-5.5 size-3.5 -translate-y-1/2" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="কাস্টমার খুঁজুন..."
          className="font-bangla pl-7"
        />
      </div>

      <div className="divide-border scrollbar-hidden min-h-0 flex-1 divide-y overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground font-bangla p-4 text-center text-sm">
            কোনো কথোপকথন পাওয়া যায়নি।
          </p>
        ) : (
          filtered.map((conversation) => (
            <ConversationListItem
              key={conversation.id}
              conversation={conversation}
              active={conversation.id === selectedId}
              onSelect={() => onSelect(conversation.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
