"use client";

import { Package, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { fetchCategories } from "@/features/categories/api/categories";
import type { Category } from "@/features/categories/schemas/category";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/features/products/api/products";
import { ProductCard } from "@/features/products/components/product-card";
import {
  type ProductFormValues,
  ProductFormSheet,
} from "@/features/products/components/product-form-sheet";
import { ProductsSummary } from "@/features/products/components/products-summary";
import type { Product } from "@/features/products/schemas/product";
import { ApiError } from "@/lib/api-client";
import { cn } from "cn";

type State = { phase: "loading" } | { phase: "error" } | { phase: "ready"; data: Product[] };

export function ProductsView() {
  const [state, setState] = useState<State>({ phase: "loading" });
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<"all" | string>("all");
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchProducts()
      .then((data) => {
        if (!cancelled) setState({ phase: "ready", data });
      })
      .catch(() => {
        if (!cancelled) setState({ phase: "error" });
      });

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

  const products = state.phase === "ready" ? state.data : [];

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const source = state.phase === "ready" ? state.data : [];
    return source.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.categoryId === activeCategory;
      const matchesQuery = !normalized || product.name.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [state, activeCategory, query]);

  const editingProduct = products.find((product) => product.id === editingId) ?? null;

  function openCreateForm() {
    setEditingId(null);
    setFormOpen(true);
  }

  function openEditForm(id: string) {
    setEditingId(id);
    setFormOpen(true);
  }

  async function handleDelete(id: string) {
    setDeleteError(null);
    try {
      await deleteProduct(id);
      setState((current) =>
        current.phase === "ready"
          ? { ...current, data: current.data.filter((product) => product.id !== id) }
          : current,
      );
    } catch (error) {
      setDeleteError(error instanceof ApiError ? error.message : "পণ্য মুছে ফেলা যায়নি।");
    }
  }

  async function submitForm(values: ProductFormValues) {
    if (!values.categoryId) return;

    const payload = {
      name: values.name.trim(),
      description: values.description.trim(),
      categoryId: values.categoryId,
      price: Number(values.price),
      discountPrice: values.discountPrice.trim() ? Number(values.discountPrice) : null,
      imageUrl: values.imageUrl,
      imagePublicId: values.imagePublicId,
      inStock: values.inStock,
    };

    const saved = editingId
      ? await updateProduct(editingId, payload)
      : await createProduct(payload);

    setState((current) => {
      if (current.phase !== "ready") return current;
      if (editingId) {
        return {
          ...current,
          data: current.data.map((product) => (product.id === editingId ? saved : product)),
        };
      }
      return { ...current, data: [saved, ...current.data] };
    });

    setFormOpen(false);
    setEditingId(null);
  }

  if (state.phase === "loading") {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (state.phase === "error") {
    return (
      <EmptyState
        icon={Package}
        title="Could not load products"
        description="Something went wrong while fetching products. Please try again shortly."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ProductsSummary products={products} />

      {deleteError && (
        <p className="font-bangla rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {deleteError}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="scrollbar-hidden flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              activeCategory === "all"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            সব
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "font-bangla shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeCategory === category.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative sm:w-56">
            <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="পণ্য খুঁজুন..."
              className="font-bangla pl-8"
            />
          </div>
          <Button className="font-bangla shrink-0" onClick={openCreateForm}>
            <Plus className="size-4" />
            নতুন পণ্য
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No products found"
          description="Try a different search term or category filter."
        />
      ) : (
        <div className="scrollbar-hidden h-[65vh] min-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => openEditForm(product.id)}
                onDelete={() => setPendingDeleteId(product.id)}
              />
            ))}
          </div>
        </div>
      )}

      <ProductFormSheet
        product={editingProduct}
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingId(null);
        }}
        onSubmit={submitForm}
      />

      <ConfirmDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteId(null);
        }}
        title="পণ্য মুছে ফেলুন"
        description="আপনি কি নিশ্চিতভাবে এই পণ্যটি মুছে ফেলতে চান?"
        confirmLabel="মুছে ফেলুন"
        onConfirm={() => {
          if (pendingDeleteId) handleDelete(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
