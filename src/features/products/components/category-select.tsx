"use client";

import { CheckIcon, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchCategories } from "@/features/categories/api/categories";
import type { Category } from "@/features/categories/schemas/category";

export function CategorySelect({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (categoryId: string, categoryName: string) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetchCategories()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch(() => {
        if (!cancelled) setCategories([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const selected = categories.find((category) => category.id === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="font-bangla w-full justify-between">
            <span className={selected ? "" : "text-muted-foreground"}>
              {selected?.name ?? "ক্যাটাগরি নির্বাচন করুন"}
            </span>
            <ChevronDown />
          </Button>
        }
      />
      <DropdownMenuContent className="w-(--anchor-width)">
        {categories.length === 0 ? (
          <p className="font-bangla text-muted-foreground px-2 py-1.5 text-xs">
            কোনো ক্যাটাগরি নেই, আগে একটা ক্যাটাগরি তৈরি করুন।
          </p>
        ) : (
          categories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              className="font-bangla"
              onClick={() => onChange(category.id, category.name)}
            >
              {category.name}
              {value === category.id && <CheckIcon className="ml-auto size-3.5" />}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
