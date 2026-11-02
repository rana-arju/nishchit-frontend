"use client";

import { ArrowLeft, Info, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiDraftBanner } from "@/features/inbox/components/ai-draft-banner";
import { ConversationAvatar } from "@/features/inbox/components/conversation-avatar";
import { ConversationDetailSheet } from "@/features/inbox/components/conversation-detail-sheet";
import { MessageBubble } from "@/features/inbox/components/message-bubble";
import type {
  Conversation,
  ConversationStatus,
  Message,
} from "@/features/inbox/schemas/conversation";
import type { PipelineStage } from "@/types/pipeline-stage";
import { cn } from "cn";

export const conversationStatusLabel: Record<ConversationStatus, string> = {
  open: "চলমান",
  pending: "অপেক্ষমাণ",
  resolved: "সমাধান হয়েছে",
};

export const conversationStatusDotClassName: Record<ConversationStatus, string> = {
  open: "bg-chart-1",
  pending: "bg-chart-3",
  resolved: "bg-chart-4",
};

const COMPOSER_MAX_HEIGHT = 160;

export function ConversationThread({
  conversation,
  onBack,
  onChangeStatus,
  onChangeStage,
  onAddTag,
  onRemoveTag,
  onAddNote,
}: {
  conversation: Conversation;
  onBack: () => void;
  onChangeStatus: (status: ConversationStatus) => void;
  onChangeStage: (stage: PipelineStage) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onAddNote: (text: string) => void;
}) {
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const [draftDismissed, setDraftDismissed] = useState(false);
  const [draftText, setDraftText] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const messageIdRef = useRef(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, COMPOSER_MAX_HEIGHT)}px`;
  }, [draftText]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    messageIdRef.current += 1;
    setMessages((current) => [
      ...current,
      {
        id: `local-${messageIdRef.current}`,
        sender: "agent",
        text: trimmed,
        timestamp: new Date().toISOString(),
      },
    ]);
    setDraftText("");
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="তালিকায় ফিরে যান"
          className="text-muted-foreground hover:text-foreground -ml-1 md:hidden"
        >
          <ArrowLeft className="size-4.5" />
        </button>
        <ConversationAvatar name={conversation.customerName} channel={conversation.channel} />
        <div className="min-w-0 flex-1">
          <p className="font-bangla truncate text-sm font-semibold">{conversation.customerName}</p>
          <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
            <span
              className={cn(
                "size-1.5 rounded-full",
                conversationStatusDotClassName[conversation.status],
              )}
            />
            <span className="font-bangla">{conversationStatusLabel[conversation.status]}</span>
          </span>
        </div>
        <Button
          size="icon-sm"
          variant="outline"
          aria-label="বিস্তারিত তথ্য"
          onClick={() => setDetailOpen(true)}
        >
          <Info className="size-4" />
        </Button>
      </div>

      <div className="scrollbar-hidden min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>

      {conversation.aiDraftReady && conversation.aiDraft && !draftDismissed && (
        <div className="shrink-0">
          <AiDraftBanner
            draft={conversation.aiDraft}
            onUse={() => setDraftText(conversation.aiDraft ?? "")}
            onDismiss={() => setDraftDismissed(true)}
          />
        </div>
      )}

      <div className="flex shrink-0 items-end gap-2 border-t p-3">
        <Textarea
          ref={textareaRef}
          value={draftText}
          onChange={(event) => setDraftText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              sendMessage(draftText);
            }
          }}
          placeholder="একটি উত্তর লিখুন..."
          className="font-bangla scrollbar-hidden max-h-40 min-h-9 flex-1 resize-none overflow-y-auto"
          rows={1}
        />
        <Button
          size="icon"
          aria-label="পাঠান"
          disabled={!draftText.trim()}
          onClick={() => sendMessage(draftText)}
        >
          <Send className="size-4" />
        </Button>
      </div>

      <ConversationDetailSheet
        conversation={conversation}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onChangeStatus={onChangeStatus}
        onChangeStage={onChangeStage}
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
        onAddNote={onAddNote}
      />
    </div>
  );
}
