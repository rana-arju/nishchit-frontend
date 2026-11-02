import { X } from "lucide-react";
import { cn } from "cn";

const TAG_TONES = [
  "bg-chart-1/10 text-chart-1",
  "bg-chart-2/10 text-chart-2",
  "bg-chart-3/10 text-chart-3",
  "bg-chart-4/10 text-chart-4",
  "bg-chart-5/10 text-chart-5",
];

function toneFor(label: string): string {
  let hash = 0;
  for (let i = 0; i < label.length; i++)
    hash = (hash * 31 + label.charCodeAt(i)) % TAG_TONES.length;
  return TAG_TONES[hash];
}

export function TagPill({ label, onRemove }: { label: string; onRemove?: () => void }) {
  return (
    <span
      className={cn(
        "font-bangla inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
        toneFor(label),
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`${label} ট্যাগ মুছুন`}
          className="hover:opacity-70"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  );
}
