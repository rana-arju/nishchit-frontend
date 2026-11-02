import { CheckIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/features/products/schemas/product";

export function CategorySelect({
  value,
  onChange,
}: {
  value: ProductCategory | null;
  onChange: (category: ProductCategory) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="font-bangla w-full justify-between">
            <span className={value ? "" : "text-muted-foreground"}>
              {value ?? "ক্যাটাগরি নির্বাচন করুন"}
            </span>
            <ChevronDown />
          </Button>
        }
      />
      <DropdownMenuContent className="w-(--anchor-width)">
        {PRODUCT_CATEGORIES.map((category) => (
          <DropdownMenuItem
            key={category}
            className="font-bangla"
            onClick={() => onChange(category)}
          >
            {category}
            {value === category && <CheckIcon className="ml-auto size-3.5" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
