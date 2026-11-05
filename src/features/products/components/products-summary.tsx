import { AlertTriangle, FolderTree, Package, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/features/products/schemas/product";
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

export function ProductsSummary({ products }: { products: Product[] }) {
  const categoryCount = new Set(products.map((product) => product.categoryId)).size;
  const outOfStock = products.filter((product) => !product.inStock).length;

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      <SummaryTile
        label="মোট পণ্য"
        value={products.length}
        icon={Package}
        iconClassName="bg-accent text-accent-foreground"
      />
      <SummaryTile
        label="ক্যাটাগরি"
        value={categoryCount}
        icon={FolderTree}
        iconClassName="bg-chart-2/15 text-chart-2"
      />
      <SummaryTile
        label="স্টকে নেই"
        value={outOfStock}
        icon={AlertTriangle}
        iconClassName="bg-destructive/10 text-destructive"
      />
    </div>
  );
}
