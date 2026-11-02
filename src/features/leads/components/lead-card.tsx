import { GripVertical, MessageSquareText, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TagPill } from "@/components/shared/tag-pill";
import type { Lead } from "@/features/leads/schemas/lead";
import { cn } from "cn";

function formatRelativeTime(timestamp: string): string {
  const diffHours = Math.round((Date.now() - new Date(timestamp).getTime()) / 3_600_000);
  if (diffHours < 1) return "এইমাত্র";
  if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
  return `${Math.round(diffHours / 24)} দিন আগে`;
}

export function LeadCard({
  lead,
  isDragging,
  onClick,
  onDragStart,
  onDragEnd,
}: {
  lead: Lead;
  isDragging: boolean;
  onClick: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}) {
  return (
    <Card
      size="sm"
      role="button"
      tabIndex={0}
      draggable
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", lead.id);
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter") onClick();
      }}
      className={cn(
        "hover:border-primary/40 cursor-grab transition-all active:cursor-grabbing",
        isDragging && "scale-[0.98] opacity-40",
      )}
    >
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1">
            <GripVertical className="text-muted-foreground size-3.5 shrink-0" aria-hidden="true" />
            <p className="font-bangla truncate text-sm font-semibold">{lead.name}</p>
          </div>
          <span className="text-muted-foreground shrink-0 text-[11px]">
            {formatRelativeTime(lead.lastActivityAt)}
          </span>
        </div>

        <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
          <Phone className="size-3" />
          {lead.phone}
        </span>

        {lead.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {lead.tags.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>
        )}

        {lead.notes.length > 0 && (
          <span className="text-muted-foreground inline-flex items-center gap-1 text-[11px]">
            <MessageSquareText className="size-3" />
            {lead.notes.length} নোট
          </span>
        )}
      </CardContent>
    </Card>
  );
}
