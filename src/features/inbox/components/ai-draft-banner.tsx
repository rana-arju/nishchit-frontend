import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AiDraftBanner({
  draft,
  onUse,
  onDismiss,
}: {
  draft: string;
  onUse: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="bg-accent/60 border-primary/20 mx-4 mb-3 rounded-xl border px-3.5 py-3">
      <div className="flex items-start justify-between gap-2">
        <span className="text-primary inline-flex items-center gap-1.5 text-xs font-semibold">
          <Sparkles className="size-3.5" />
          AI-প্রস্তাবিত রিপ্লাই
        </span>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="বাতিল করুন"
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      </div>
      <p className="font-bangla mt-1.5 text-sm leading-relaxed">{draft}</p>
      <div className="mt-2.5 flex gap-2">
        <Button size="sm" onClick={onUse} className="font-bangla">
          ব্যবহার করুন
        </Button>
        <Button size="sm" variant="ghost" onClick={onDismiss} className="font-bangla">
          বাতিল
        </Button>
      </div>
    </div>
  );
}
