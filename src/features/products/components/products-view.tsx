"use client";

import { Package, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { fetchProducts } from "@/features/products/api/products";
import { ProductCard } from "@/features/products/components/product-card";
import {
  type ProductFormValues,
  ProductFormSheet,
} from "@/features/products/components/product-form-sheet";
import { ProductsSummary } from "@/features/products/components/products-summary";
import {
  PRODUCT_CATEGORIES,
  type Product,
  type ProductCategory,
} from "@/features/products/schemas/product";
import { cn } from "cn";

type State = { phase: "loading" } | { phase: "error" } | { phase: "ready"; data: Product[] };

export function ProductsView() {
  const [state, setState] = useState<State>({ phase: "loading" });
  const [activeCategory, setActiveCategory] = useState<"all" | ProductCategory>("all");
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
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

    return () => {
      cancelled = true;
    };
  }, []);

  const products = state.phase === "ready" ? state.data : [];

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const source = state.phase === "ready" ? state.data : [];
    return source.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
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

  function deleteProduct(id: string) {
    setState((current) =>
      current.phase === "ready"
        ? { ...current, data: current.data.filter((product) => product.id !== id) }
        : current,
    );
  }

  function submitForm(values: ProductFormValues) {
    if (!values.category) return;

    if (editingId) {
      setState((current) =>
        current.phase === "ready"
          ? {
              ...current,
              data: current.data.map((product) =>
                product.id === editingId
                  ? {
                      ...product,
                      name: values.name.trim(),
                      description: values.description.trim(),
                      category: values.category as ProductCategory,
                      price: Number(values.price),
                      discountPrice: values.discountPrice.trim()
                        ? Number(values.discountPrice)
                        : undefined,
                      imageUrl: values.imageUrl ?? undefined,
                      inStock: values.inStock,
                    }
                  : product,
              ),
            }
          : current,
      );
    } else {
      const newProduct: Product = {
        id: `product-${Date.now()}`,
        name: values.name.trim(),
        description: values.description.trim(),
        category: values.category,
        price: Number(values.price),
        discountPrice: values.discountPrice.trim() ? Number(values.discountPrice) : undefined,
        imageUrl: values.imageUrl ?? undefined,
        inStock: values.inStock,
        createdAt: new Date().toISOString(),
      };
      setState((current) =>
        current.phase === "ready" ? { ...current, data: [newProduct, ...current.data] } : current,
      );
    }

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
          {PRODUCT_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "font-bangla shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeCategory === category
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {category}
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
          if (pendingDeleteId) deleteProduct(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
