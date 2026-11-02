import Image from "next/image";
import type { AriaAttributes } from "react";
import type { Channel } from "@/features/inbox/schemas/conversation";
import { cn } from "cn";

const channelColorClassName: Record<Channel, string> = {
  messenger: "channel-brand-messenger",
  instagram: "channel-brand-instagram",
  whatsapp: "channel-brand-whatsapp",
};

export function ChannelIcon({
  channel,
  branded = false,
  className,
  "aria-hidden": ariaHidden,
}: {
  channel: Channel;
  branded?: boolean;
  className?: string;
  "aria-hidden"?: AriaAttributes["aria-hidden"];
}) {
  const iconClassName = cn(branded && channelColorClassName[channel], className);

  if (channel === "messenger") {
    return (
      <Image
        src="/messenger.png"
        alt=""
        width={24}
        height={24}
        className={cn("object-contain", className)}
        aria-hidden={ariaHidden}
      />
    );
  }

  if (channel === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={iconClassName} fill="none" aria-hidden={ariaHidden}>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2.25" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2.25" />
        <circle cx="17.4" cy="6.7" r="1.25" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={iconClassName} fill="currentColor" aria-hidden={ariaHidden}>
      <path d="M20.52 3.48A11.8 11.8 0 0 0 12.07 0C5.5 0 .16 5.34.16 11.91c0 2.1.55 4.15 1.59 5.95L.06 24l6.29-1.65a11.9 11.9 0 0 0 5.71 1.46h.01c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.23-6.17-3.46-8.42Zm-8.45 18.32h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.52-5.27c0-5.46 4.45-9.91 9.92-9.91a9.82 9.82 0 0 1 7.01 2.9 9.86 9.86 0 0 1 2.9 7.01c-.01 5.46-4.46 9.89-9.93 9.89Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9 9 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.19-.57-.34Z" />
    </svg>
  );
}
