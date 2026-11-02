import { FolderTree, Package, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/features/categories/schemas/category";
import { cn } from "cn";

function SummaryTile({
  label,
  value,
  icon: Icon,
  iconClassName,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  iconClassName: string;
}) {
  return (
    <Card size="sm" className="border-transparent shadow-sm ring-1">
      <CardContent className="flex items-center gap-3">
        <div className={cn("rounded-xl p-2.5 ring-1 ring-black/5 ring-inset", iconClassName)}>
          <Icon className="size-4.5" />
        </div>
        <div>
          <p className="text-xl font-semibold tabular-nums">{value.toLocaleString("bn-BD")}</p>
          <p className="font-bangla text-muted-foreground text-xs">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoriesSummary({ categories }: { categories: Category[] }) {
  const totalProducts = categories.reduce((sum, category) => sum + category.productCount, 0);

  return (
    <div className="grid grid-cols-2 gap-3 sm:w-fit sm:gap-4">
      <SummaryTile
        label="মোট ক্যাটাগরি"
        value={categories.length}
        icon={FolderTree}
        iconClassName="bg-accent text-accent-foreground"
      />
      <SummaryTile
        label="মোট পণ্য"
        value={totalProducts}
        icon={Package}
        iconClassName="bg-chart-2/15 text-chart-2"
      />
    </div>
  );
}
