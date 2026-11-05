"use client";

import { Check, FolderTree, Loader2, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Category } from "@/features/categories/schemas/category";
import { ApiError } from "@/lib/api-client";
import { cn } from "cn";

const TONES = [
  "bg-chart-1/15 text-chart-1",
  "bg-chart-2/15 text-chart-2",
  "bg-chart-3/15 text-chart-3",
  "bg-chart-4/15 text-chart-4",
  "bg-chart-5/15 text-chart-5",
];

function toneFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) % TONES.length;
  return TONES[hash];
}

export function CategoryCard({
  category,
  onRename,
  onDelete,
}: {
  category: Category;
  onRename: (name: string) => Promise<void>;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(category.name);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function submitRename() {
    const trimmed = draft.trim();
    if (!trimmed) return;

    setError(null);
    setSaving(true);
    try {
      await onRename(trimmed);
      setEditing(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "নাম পরিবর্তন করা যায়নি।");
    } finally {
      setSaving(false);
    }
  }

  function cancelEdit() {
    setDraft(category.name);
    setError(null);
    setEditing(false);
  }

  return (
    <Card className="border-transparent shadow-sm ring-1">
      <CardContent className="flex items-center gap-3">
        <div
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-xl",
            toneFor(category.name),
          )}
        >
          <FolderTree className="size-5" />
        </div>

        {editing ? (
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <Input
                autoFocus
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submitRename();
                  if (event.key === "Escape") cancelEdit();
                }}
                disabled={saving}
                aria-invalid={Boolean(error)}
                className="font-bangla h-8"
              />
              <button
                type="button"
                onClick={submitRename}
                disabled={saving}
                aria-label="সংরক্ষণ করুন"
                className="text-chart-4 hover:bg-muted rounded-md p-1.5 disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Check className="size-4" />
                )}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                disabled={saving}
                aria-label="বাতিল"
                className="text-muted-foreground hover:bg-muted rounded-md p-1.5 disabled:opacity-50"
              >
                <X className="size-4" />
              </button>
            </div>
            {error && <p className="text-destructive font-bangla text-xs">{error}</p>}
          </div>
        ) : (
          <>
            <div className="min-w-0 flex-1">
              <p className="font-bangla truncate text-sm font-semibold">{category.name}</p>
              <p className="font-bangla text-muted-foreground text-xs">
                {category.productCount.toLocaleString("bn-BD")} টি পণ্য
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={() => setEditing(true)}
                aria-label="নাম পরিবর্তন করুন"
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-1.5"
              >
                <Pencil className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={onDelete}
                aria-label="মুছুন"
                className="text-destructive hover:bg-destructive/10 rounded-md p-1.5"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
