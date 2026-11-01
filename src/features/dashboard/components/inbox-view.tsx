"use client";

import { Camera, Inbox, MessageCircle, MessagesSquare } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "@/features/dashboard/components/empty-state";

const CHANNELS = [
  { key: "all", label: "All channels", icon: Inbox, available: true },
  { key: "messenger", label: "Messenger", icon: MessageCircle, available: true },
  { key: "instagram", label: "Instagram", icon: Camera, available: false },
  { key: "whatsapp", label: "WhatsApp", icon: MessagesSquare, available: false },
] as const;

export function InboxView() {
  const [active, setActive] = useState<(typeof CHANNELS)[number]["key"]>("all");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {CHANNELS.map((channel) => (
          <button
            key={channel.key}
            type="button"
            disabled={!channel.available}
            onClick={() => setActive(channel.key)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              active === channel.key
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <channel.icon className="size-3.5" aria-hidden="true" />
            {channel.label}
            {!channel.available && <span className="text-[10px]">(soon)</span>}
          </button>
        ))}
      </div>

      <EmptyState
        icon={Inbox}
        title="No conversations yet"
        description="Messages from your connected channels will land here, with AI-drafted replies ready to review and send."
      />
    </div>
  );
}
