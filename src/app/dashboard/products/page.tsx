import { ProductsManager } from "@/features/dashboard/components/products-manager";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="text-muted-foreground text-sm">
          Keep your catalog up to date — the AI chatbot uses it to answer customers.
        </p>
      </div>
      <ProductsManager />
    </div>
  );
}
