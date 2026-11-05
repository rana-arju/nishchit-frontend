"use client";

import { FolderTree, Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  renameCategory,
} from "@/features/categories/api/categories";
import { CategoriesSummary } from "@/features/categories/components/categories-summary";
import { CategoryCard } from "@/features/categories/components/category-card";
import type { Category } from "@/features/categories/schemas/category";
import { ApiError } from "@/lib/api-client";

type State = { phase: "loading" } | { phase: "error" } | { phase: "ready"; data: Category[] };

export function CategoriesView() {
  const [state, setState] = useState<State>({ phase: "loading" });
  const [name, setName] = useState("");
  const [addError, setAddError] = useState<string | null>(null);
  const [addStatus, setAddStatus] = useState<"idle" | "submitting">("idle");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchCategories()
      .then((data) => {
        if (!cancelled) setState({ phase: "ready", data });
      })
      .catch(() => {
        if (!cancelled) setState({ phase: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = state.phase === "ready" ? state.data : [];

  async function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setAddError(null);
    setAddStatus("submitting");
    try {
      const created = await createCategory(trimmed);
      setState((current) =>
        current.phase === "ready" ? { ...current, data: [...current.data, created] } : current,
      );
      setName("");
    } catch (error) {
      setAddError(error instanceof ApiError ? error.message : "ক্যাটাগরি যোগ করা যায়নি।");
    } finally {
      setAddStatus("idle");
    }
  }

  async function handleRename(id: string, newName: string): Promise<void> {
    const updated = await renameCategory(id, newName);
    setState((current) =>
      current.phase === "ready"
        ? {
            ...current,
            data: current.data.map((category) => (category.id === id ? updated : category)),
          }
        : current,
    );
  }

  async function handleDelete(id: string) {
    setDeleteError(null);
    try {
      await deleteCategory(id);
      setState((current) =>
        current.phase === "ready"
          ? { ...current, data: current.data.filter((category) => category.id !== id) }
          : current,
      );
    } catch (error) {
      setDeleteError(error instanceof ApiError ? error.message : "ক্যাটাগরি মুছে ফেলা যায়নি।");
    }
  }

  if (state.phase === "error") {
    return (
      <EmptyState
        icon={FolderTree}
        title="Could not load categories"
        description="Something went wrong while fetching categories. Please try again shortly."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {state.phase === "ready" && <CategoriesSummary categories={categories} />}

      {deleteError && (
        <p className="font-bangla rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {deleteError}
        </p>
      )}

      <Card className="border-transparent shadow-sm ring-1">
        <CardHeader>
          <CardTitle className="font-bangla text-sm">নতুন ক্যাটাগরি যোগ করুন</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex flex-col gap-2">
            <div className="flex gap-3">
              <Input
                placeholder="যেমন: টি-শার্ট"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setAddError(null);
                }}
                aria-invalid={Boolean(addError)}
                disabled={addStatus === "submitting"}
                className="font-bangla h-10"
              />
              <Button
                type="submit"
                disabled={addStatus === "submitting"}
                className="font-bangla h-10 shrink-0"
              >
                {addStatus === "submitting" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Plus className="size-4" />
                )}
                যোগ করুন
              </Button>
            </div>
            {addError && <p className="text-destructive font-bangla text-xs">{addError}</p>}
          </form>
        </CardContent>
      </Card>

      {state.phase === "loading" ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <EmptyState
          icon={FolderTree}
          title="No categories yet"
          description="Group your products into categories to keep your catalog and chatbot answers organized."
        />
      ) : (
        <div className="scrollbar-hidden max-h-[60vh] overflow-y-auto">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onRename={(newName) => handleRename(category.id, newName)}
                onDelete={() => setPendingDeleteId(category.id)}
              />
            ))}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteId(null);
        }}
        title="ক্যাটাগরি মুছে ফেলুন"
        description="আপনি কি নিশ্চিতভাবে এই ক্যাটাগরিটি মুছে ফেলতে চান?"
        confirmLabel="মুছে ফেলুন"
        onConfirm={() => {
          if (pendingDeleteId) handleDelete(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
