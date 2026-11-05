import { Package } from "lucide-react";
import { ChannelIcon } from "@/features/inbox/components/channel-icon";
import type { Channel } from "@/features/inbox/schemas/conversation";

const KNOWN_CHANNELS: readonly Channel[] = ["messenger", "instagram", "whatsapp"];

function isKnownChannel(value: string): value is Channel {
  return (KNOWN_CHANNELS as readonly string[]).includes(value);
}

export function OrderChannelIcon({
  channel,
  branded = false,
  className,
}: {
  channel: string;
  branded?: boolean;
  className?: string;
}) {
  if (isKnownChannel(channel)) {
    return <ChannelIcon channel={channel} branded={branded} className={className} />;
  }
  return <Package className={className} aria-hidden />;
}
