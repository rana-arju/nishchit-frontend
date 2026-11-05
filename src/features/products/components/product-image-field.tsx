"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef } from "react";

export function ProductImageField({
  previewUrl,
  uploading,
  onSelect,
  onRemove,
}: {
  previewUrl: string | null;
  uploading: boolean;
  onSelect: (file: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="border-border bg-muted/40 hover:bg-muted relative size-20 shrink-0 overflow-hidden rounded-xl border border-dashed transition-colors disabled:cursor-not-allowed"
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- mix of remote Cloudinary urls and local blob previews
          <img src={previewUrl} alt="" className="size-full object-cover" />
        ) : (
          <span className="text-muted-foreground flex size-full flex-col items-center justify-center gap-1">
            <ImagePlus className="size-5" />
          </span>
        )}
        {uploading && (
          <div className="absolute inset-0 grid place-items-center bg-black/50">
            <Loader2 className="size-5 animate-spin text-white" />
          </div>
        )}
      </button>

      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="font-bangla text-primary text-xs font-medium hover:underline disabled:opacity-50"
        >
          {previewUrl ? "ছবি পরিবর্তন করুন" : "ছবি আপলোড করুন"}
        </button>
        {previewUrl && !uploading && (
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
