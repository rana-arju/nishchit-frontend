import { ImageOff, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/features/products/schemas/product";

export function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Card className="group gap-0 overflow-hidden border-transparent p-0 shadow-sm ring-1 transition-shadow hover:shadow-md">
      <div className="bg-muted relative aspect-square">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- mix of remote mock urls and local blob previews
          <img src={product.imageUrl} alt={product.name} className="size-full object-cover" />
        ) : (
          <div className="text-muted-foreground flex size-full items-center justify-center">
            <ImageOff className="size-8" />
          </div>
        )}

        {!product.inStock && (
          <span className="font-bangla bg-destructive text-destructive-foreground absolute top-2 left-2 rounded-full px-2 py-0.5 text-[11px] font-medium">
            স্টক নেই
          </span>
        )}

        <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={onEdit}
            aria-label="পণ্য এডিট করুন"
            className="bg-background/90 text-foreground hover:bg-background grid size-7 place-items-center rounded-full shadow-sm"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label="পণ্য মুছুন"
            className="bg-background/90 text-destructive hover:bg-background grid size-7 place-items-center rounded-full shadow-sm"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>

      <CardContent className="flex flex-col gap-1 p-3">
        <span className="font-bangla bg-muted text-muted-foreground w-fit rounded-full px-2 py-0.5 text-[10px] font-medium">
          {product.category}
        </span>
        <p className="font-bangla truncate text-sm font-semibold">{product.name}</p>
        <p className="font-bangla text-muted-foreground line-clamp-2 text-xs leading-relaxed">
          {product.description || "কোনো বিবরণ নেই।"}
        </p>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-sm font-semibold tabular-nums">
            ৳{(product.discountPrice ?? product.price).toLocaleString("bn-BD")}
          </span>
          {product.discountPrice !== undefined && (
            <span className="text-muted-foreground text-xs tabular-nums line-through">
              ৳{product.price.toLocaleString("bn-BD")}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
