import { CategoriesView } from "@/features/categories/components/categories-view";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
        <p className="text-muted-foreground text-sm">Organize your products into categories.</p>
      </div>
      <CategoriesView />
    </div>
  );
}
