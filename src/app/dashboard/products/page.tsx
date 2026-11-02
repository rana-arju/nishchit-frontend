import { ProductsView } from "@/features/products/components/products-view";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="text-muted-foreground text-sm">
          Keep your catalog up to date — the AI chatbot uses it to answer customers.
        </p>
      </div>
      <ProductsView />
    </div>
  );
}
