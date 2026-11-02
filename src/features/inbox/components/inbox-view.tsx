"use client";

import { Inbox } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { fetchConversations } from "@/features/inbox/api/conversations";
import { ConversationList } from "@/features/inbox/components/conversation-list";
import { ConversationThread } from "@/features/inbox/components/conversation-thread";
import { ChannelIcon } from "@/features/inbox/components/channel-icon";
import type {
  Channel,
  Conversation,
  ConversationStatus,
} from "@/features/inbox/schemas/conversation";
import type { PipelineStage } from "@/types/pipeline-stage";
import { cn } from "cn";

const CHANNELS: {
  key: "all" | Channel;
  label: string;
  available: boolean;
}[] = [
  { key: "all", label: "All channels", available: true },
  {
    key: "messenger",
    label: "Messenger",
    available: true,
  },
  {
    key: "instagram",
    label: "Instagram",
    available: false,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    available: false,
  },
];

type State = { phase: "loading" } | { phase: "error" } | { phase: "ready"; data: Conversation[] };

export function InboxView() {
  const [state, setState] = useState<State>({ phase: "loading" });
  const [activeChannel, setActiveChannel] = useState<(typeof CHANNELS)[number]["key"]>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchConversations()
      .then((data) => {
        if (!cancelled) setState({ phase: "ready", data });
      })
      .catch(() => {
        if (!cancelled) setState({ phase: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const conversations = state.phase === "ready" ? state.data : [];
    return activeChannel === "all"
      ? conversations
      : conversations.filter((conversation) => conversation.channel === activeChannel);
  }, [state, activeChannel]);

  const selectedConversation =
    filtered.find((conversation) => conversation.id === selectedId) ?? null;

  function updateConversation(id: string, updater: (conversation: Conversation) => Conversation) {
    setState((current) =>
      current.phase === "ready"
        ? {
            ...current,
            data: current.data.map((conversation) =>
              conversation.id === id ? updater(conversation) : conversation,
            ),
          }
        : current,
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {CHANNELS.map((channel) => (
          <button
            key={channel.key}
            type="button"
            disabled={!channel.available}
            onClick={() => setActiveChannel(channel.key)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              activeChannel === channel.key
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {channel.key === "all" ? (
              <Inbox className="size-3.5" aria-hidden="true" />
            ) : (
              <ChannelIcon channel={channel.key} branded className="size-3.5" aria-hidden="true" />
            )}
            {channel.label}
            {!channel.available && <span className="text-[10px]">(soon)</span>}
          </button>
        ))}
      </div>

      {state.phase === "loading" && <Skeleton className="h-[70vh] min-h-120 w-full rounded-xl" />}

      {state.phase === "error" && (
        <EmptyState
          icon={Inbox}
          title="Could not load conversations"
          description="Something went wrong while fetching your inbox. Please try again shortly."
        />
      )}

      {state.phase === "ready" && filtered.length === 0 && (
        <EmptyState
          icon={Inbox}
          title="No conversations yet"
          description="Messages from your connected channels will land here, with AI-drafted replies ready to review and send."
        />
      )}

      {state.phase === "ready" && filtered.length > 0 && (
        <div className="bg-card grid h-[70vh] min-h-120 overflow-hidden rounded-xl border shadow-sm md:grid-cols-[320px_1fr]">
          <ConversationList
            conversations={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
            className={cn("md:border-r", selectedId ? "hidden md:flex" : "flex")}
          />

          <div className={cn("min-h-0 flex-col", selectedId ? "flex" : "hidden md:flex")}>
            {selectedConversation ? (
              <ConversationThread
                key={selectedConversation.id}
                conversation={selectedConversation}
                onBack={() => setSelectedId(null)}
                onChangeStatus={(status: ConversationStatus) =>
                  updateConversation(selectedConversation.id, (conversation) => ({
                    ...conversation,
                    status,
                  }))
                }
                onChangeStage={(stage: PipelineStage) =>
                  updateConversation(selectedConversation.id, (conversation) => ({
                    ...conversation,
                    stage,
                  }))
                }
                onAddTag={(tag) =>
                  updateConversation(selectedConversation.id, (conversation) =>
                    conversation.tags.includes(tag)
                      ? conversation
                      : { ...conversation, tags: [...conversation.tags, tag] },
                  )
                }
                onRemoveTag={(tag) =>
                  updateConversation(selectedConversation.id, (conversation) => ({
                    ...conversation,
                    tags: conversation.tags.filter((existing) => existing !== tag),
                  }))
                }
                onAddNote={(text) =>
                  updateConversation(selectedConversation.id, (conversation) => ({
                    ...conversation,
                    notes: [
                      ...conversation.notes,
                      { id: `note-${Date.now()}`, text, createdAt: new Date().toISOString() },
                    ],
                  }))
                }
              />
            ) : (
              <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
                <Inbox className="size-8" />
                <p className="text-sm">একটি কথোপকথন নির্বাচন করুন</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
