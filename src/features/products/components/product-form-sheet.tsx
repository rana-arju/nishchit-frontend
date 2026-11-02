"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelect } from "@/features/products/components/category-select";
import { ProductImageField } from "@/features/products/components/product-image-field";
import type { Product, ProductCategory } from "@/features/products/schemas/product";

export type ProductFormValues = {
  name: string;
  description: string;
  category: ProductCategory | null;
  price: string;
  discountPrice: string;
  imageUrl: string | null;
  inStock: boolean;
};

function valuesFromProduct(product: Product | null): ProductFormValues {
  if (!product) {
    return {
      name: "",
      description: "",
      category: null,
      price: "",
      discountPrice: "",
      imageUrl: null,
      inStock: true,
    };
  }
  return {
    name: product.name,
    description: product.description,
    category: product.category,
    price: String(product.price),
    discountPrice: product.discountPrice !== undefined ? String(product.discountPrice) : "",
    imageUrl: product.imageUrl ?? null,
    inStock: product.inStock,
  };
}

function isValid(values: ProductFormValues): boolean {
  if (!values.name.trim() || !values.category) return false;
  const price = Number(values.price);
  if (!Number.isFinite(price) || price <= 0) return false;
  if (values.discountPrice.trim()) {
    const discount = Number(values.discountPrice);
    if (!Number.isFinite(discount) || discount < 0 || discount >= price) return false;
  }
  return true;
}

function ProductFormBody({
  initialProduct,
  onSubmit,
  onCancel,
}: {
  initialProduct: Product | null;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<ProductFormValues>(() => valuesFromProduct(initialProduct));

  useEffect(() => {
    return () => {
      if (values.imageUrl?.startsWith("blob:")) URL.revokeObjectURL(values.imageUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- revoke only on unmount
  }, []);

  function selectImage(file: File) {
    setValues((current) => {
      if (current.imageUrl?.startsWith("blob:")) URL.revokeObjectURL(current.imageUrl);
      return { ...current, imageUrl: URL.createObjectURL(file) };
    });
  }

  function removeImage() {
    setValues((current) => {
      if (current.imageUrl?.startsWith("blob:")) URL.revokeObjectURL(current.imageUrl);
      return { ...current, imageUrl: null };
    });
  }

  return (
    <>
      <SheetHeader className="border-b">
        <SheetTitle>{initialProduct ? "পণ্য এডিট করুন" : "নতুন পণ্য"}</SheetTitle>
        <SheetDescription className="font-bangla">
          পণ্যের তথ্য দিন, এআই চ্যাটবট এটি ব্যবহার করে কাস্টমারদের উত্তর দেবে।
        </SheetDescription>
      </SheetHeader>

      <div className="scrollbar-hidden flex flex-1 flex-col gap-5 overflow-y-auto p-4">
        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">পণ্যের ছবি</p>
          <ProductImageField
            previewUrl={values.imageUrl}
            onSelect={selectImage}
            onRemove={removeImage}
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">পণ্যের নাম</p>
          <Input
            value={values.name}
            onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
            placeholder="যেমন: কটন পাঞ্জাবি - মেরুন"
            className="font-bangla"
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">ক্যাটাগরি</p>
          <CategorySelect
            value={values.category}
            onChange={(category) => setValues((current) => ({ ...current, category }))}
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">বিবরণ</p>
          <Textarea
            value={values.description}
            onChange={(event) =>
              setValues((current) => ({ ...current, description: event.target.value }))
            }
            placeholder="পণ্যের সংক্ষিপ্ত বিবরণ লিখুন..."
            className="font-bangla min-h-20"
          />
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground font-bangla text-xs font-medium">মূল্য (৳)</p>
            <Input
              value={values.price}
              onChange={(event) =>
                setValues((current) => ({ ...current, price: event.target.value }))
              }
              placeholder="০"
              inputMode="numeric"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground font-bangla text-xs font-medium">
              ডিসকাউন্ট মূল্য (ঐচ্ছিক)
            </p>
            <Input
              value={values.discountPrice}
              onChange={(event) =>
                setValues((current) => ({ ...current, discountPrice: event.target.value }))
              }
              placeholder="০"
              inputMode="numeric"
            />
          </div>
        </section>

        <section className="flex items-center justify-between gap-2">
          <p className="font-bangla text-sm font-medium">স্টকে আছে</p>
          <Switch
            checked={values.inStock}
            onCheckedChange={(checked) =>
              setValues((current) => ({ ...current, inStock: checked }))
            }
          />
        </section>
      </div>

      <SheetFooter className="flex-row border-t">
        <Button variant="outline" className="font-bangla flex-1" onClick={onCancel}>
          বাতিল
        </Button>
        <Button
          className="font-bangla flex-1"
          disabled={!isValid(values)}
          onClick={() => onSubmit(values)}
        >
          {initialProduct ? "আপডেট করুন" : "পণ্য যোগ করুন"}
        </Button>
      </SheetFooter>
    </>
  );
}

export function ProductFormSheet({
  product,
  open,
  onOpenChange,
  onSubmit,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ProductFormValues) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0 overflow-y-auto">
        {open && (
          <ProductFormBody
            key={product?.id ?? "create"}
            initialProduct={product}
            onSubmit={onSubmit}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
