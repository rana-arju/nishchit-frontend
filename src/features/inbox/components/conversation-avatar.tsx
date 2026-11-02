import { ChannelIcon } from "@/features/inbox/components/channel-icon";
import type { Channel } from "@/features/inbox/schemas/conversation";
import { cn } from "cn";

const AVATAR_TONES = [
  "bg-chart-1/15 text-chart-1",
  "bg-chart-2/15 text-chart-2",
  "bg-chart-3/15 text-chart-3",
  "bg-chart-4/15 text-chart-4",
  "bg-chart-5/15 text-chart-5",
];

const channelBadgeClassName: Record<Channel, string> = {
  messenger: "channel-badge-messenger",
  instagram: "channel-badge-instagram",
  whatsapp: "channel-badge-whatsapp",
};

function initialsFor(name: string): string {
  return name.trim().slice(0, 1).toUpperCase();
}

function toneFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = (hash * 31 + name.charCodeAt(i)) % AVATAR_TONES.length;
  return AVATAR_TONES[hash];
}

export function ConversationAvatar({
  name,
  channel,
  className,
}: {
  name: string;
  channel: Channel;
  className?: string;
}) {
  return (
    <div className={cn("relative shrink-0", className)}>
      <div
        className={cn("grid size-10 place-items-center rounded-full font-semibold", toneFor(name))}
      >
        {initialsFor(name)}
      </div>
      <span
        className={cn(
          "ring-background absolute -right-1.5 -bottom-1.5 grid size-6 place-items-center rounded-full ring-2",
          channelBadgeClassName[channel],
        )}
      >
        <ChannelIcon channel={channel} className="size-3.5" aria-hidden="true" />
      </span>
    </div>
  );
}
