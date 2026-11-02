"use client";

import { ImagePlus, X } from "lucide-react";
import { useRef } from "react";

export function ProductImageField({
  previewUrl,
  onSelect,
  onRemove,
}: {
  previewUrl: string | null;
  onSelect: (file: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="border-border bg-muted/40 hover:bg-muted relative size-20 shrink-0 overflow-hidden rounded-xl border border-dashed transition-colors"
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- local blob preview, not an optimizable remote asset
          <img src={previewUrl} alt="" className="size-full object-cover" />
        ) : (
          <span className="text-muted-foreground flex size-full flex-col items-center justify-center gap-1">
            <ImagePlus className="size-5" />
          </span>
        )}
      </button>

      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="font-bangla text-primary text-xs font-medium hover:underline"
        >
          {previewUrl ? "ছবি পরিবর্তন করুন" : "ছবি আপলোড করুন"}
        </button>
        {previewUrl && (
          <button
            type="button"
            onClick={onRemove}
            className="font-bangla text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs"
          >
            <X className="size-3" />
            সরিয়ে ফেলুন
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onSelect(file);
          event.target.value = "";
        }}
      />
    </div>
  );
}
