"use client";

import { FolderTree, Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/features/dashboard/components/empty-state";

type Category = { id: string; name: string };

export function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");

  function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;

    setCategories((prev) => [...prev, { id: crypto.randomUUID(), name: name.trim() }]);
    setName("");
  }

  function handleRemove(id: string) {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Add a category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex gap-3">
            <Input
              placeholder="e.g. T-Shirts"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-10"
            />
            <Button type="submit" size="sm" className="h-10 shrink-0">
              <Plus className="size-4" />
              Add
            </Button>
          </form>
        </CardContent>
      </Card>

      {categories.length === 0 ? (
        <EmptyState
          icon={FolderTree}
          title="No categories yet"
          description="Group your products into categories to keep your catalog and chatbot answers organized."
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category.id}
              className="bg-muted flex items-center gap-1.5 rounded-full py-1.5 pr-1.5 pl-3 text-sm font-medium"
            >
              {category.name}
              <button
                type="button"
                onClick={() => handleRemove(category.id)}
                aria-label={`Remove ${category.name}`}
                className="hover:bg-background/80 rounded-full p-1"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
