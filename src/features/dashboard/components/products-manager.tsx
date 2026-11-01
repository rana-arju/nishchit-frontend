"use client";

import { Package, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/features/dashboard/components/empty-state";

type Product = { id: string; name: string; category: string; price: string };

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [draft, setDraft] = useState({ name: "", category: "", price: "" });

  function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.name.trim()) return;

    setProducts((prev) => [...prev, { id: crypto.randomUUID(), ...draft }]);
    setDraft({ name: "", category: "", price: "" });
  }

  function handleRemove(id: string) {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Add a product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr_auto]">
            <Input
              placeholder="Product name"
              value={draft.name}
              onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
              className="h-10"
            />
            <Input
              placeholder="Category"
              value={draft.category}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, category: event.target.value }))
              }
              className="h-10"
            />
            <Input
              placeholder="৳ Price"
              value={draft.price}
              onChange={(event) => setDraft((prev) => ({ ...prev, price: event.target.value }))}
              className="h-10"
            />
            <Button type="submit" size="sm" className="h-10">
              <Plus className="size-4" />
              Add
            </Button>
          </form>
        </CardContent>
      </Card>

      {products.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No products yet"
          description="Add your products above so the AI chatbot can answer price, size and stock questions from customers."
        />
      ) : (
        <Card>
          <CardContent className="divide-border divide-y p-0">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {product.category || "Uncategorized"}
                    {product.price ? ` · ৳ ${product.price}` : ""}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleRemove(product.id)}
                  aria-label={`Remove ${product.name}`}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
