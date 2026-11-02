"use client";

import { Check, FolderTree, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Category } from "@/features/categories/schemas/category";
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
  onRename: (name: string) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(category.name);

  function submitRename() {
    const trimmed = draft.trim();
    if (trimmed) onRename(trimmed);
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
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <Input
              autoFocus
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") submitRename();
                if (event.key === "Escape") {
                  setDraft(category.name);
                  setEditing(false);
                }
              }}
              className="font-bangla h-8"
            />
            <button
              type="button"
              onClick={submitRename}
              aria-label="সংরক্ষণ করুন"
              className="text-chart-4 hover:bg-muted rounded-md p-1.5"
            >
              <Check className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft(category.name);
                setEditing(false);
              }}
              aria-label="বাতিল"
              className="text-muted-foreground hover:bg-muted rounded-md p-1.5"
            >
              <X className="size-4" />
            </button>
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
