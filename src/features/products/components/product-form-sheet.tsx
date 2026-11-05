"use client";

import { Loader2 } from "lucide-react";
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
import { uploadProductImage } from "@/features/products/api/products";
import type { Product } from "@/features/products/schemas/product";
import { ApiError } from "@/lib/api-client";

export type ProductFormValues = {
  name: string;
  description: string;
  categoryId: string | null;
  price: string;
  discountPrice: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  inStock: boolean;
};

function valuesFromProduct(product: Product | null): ProductFormValues {
  if (!product) {
    return {
      name: "",
      description: "",
      categoryId: null,
      price: "",
      discountPrice: "",
      imageUrl: null,
      imagePublicId: null,
      inStock: true,
    };
  }
  return {
    name: product.name,
    description: product.description,
    categoryId: product.categoryId,
    price: String(product.price),
    discountPrice: product.discountPrice !== null ? String(product.discountPrice) : "",
    imageUrl: product.imageUrl,
    imagePublicId: product.imagePublicId,
    inStock: product.inStock,
  };
}

function isValid(values: ProductFormValues, imageUploading: boolean): boolean {
  if (imageUploading) return false;
  if (!values.name.trim() || !values.categoryId) return false;
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
  onSubmit: (values: ProductFormValues) => Promise<void>;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<ProductFormValues>(() => valuesFromProduct(initialProduct));
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (values.imageUrl?.startsWith("blob:")) URL.revokeObjectURL(values.imageUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- revoke only on unmount
  }, []);

  async function selectImage(file: File) {
    setImageError(null);
    const blobUrl = URL.createObjectURL(file);
    setValues((current) => {
      if (current.imageUrl?.startsWith("blob:")) URL.revokeObjectURL(current.imageUrl);
      return { ...current, imageUrl: blobUrl, imagePublicId: null };
    });

    setImageUploading(true);
    try {
      const uploaded = await uploadProductImage(file);
      setValues((current) => {
        if (current.imageUrl?.startsWith("blob:")) URL.revokeObjectURL(current.imageUrl);
        return { ...current, imageUrl: uploaded.imageUrl, imagePublicId: uploaded.imagePublicId };
      });
    } catch (error) {
      setImageError(error instanceof ApiError ? error.message : "ছবি আপলোড করা যায়নি।");
      setValues((current) => {
        if (current.imageUrl?.startsWith("blob:")) URL.revokeObjectURL(current.imageUrl);
        return { ...current, imageUrl: null, imagePublicId: null };
      });
    } finally {
      setImageUploading(false);
    }
  }

  function removeImage() {
    setValues((current) => {
      if (current.imageUrl?.startsWith("blob:")) URL.revokeObjectURL(current.imageUrl);
      return { ...current, imageUrl: null, imagePublicId: null };
    });
  }

  async function handleSubmit() {
    setFormError(null);
    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      setFormError(error instanceof ApiError ? error.message : "পণ্য সংরক্ষণ করা যায়নি।");
    } finally {
      setSubmitting(false);
    }
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
        {formError && (
          <p className="font-bangla rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {formError}
          </p>
        )}

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">পণ্যের ছবি</p>
          <ProductImageField
            previewUrl={values.imageUrl}
            uploading={imageUploading}
            onSelect={selectImage}
            onRemove={removeImage}
          />
          {imageError && <p className="text-destructive font-bangla text-xs">{imageError}</p>}
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
            value={values.categoryId}
            onChange={(categoryId) => setValues((current) => ({ ...current, categoryId }))}
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
          disabled={!isValid(values, imageUploading) || submitting}
          onClick={handleSubmit}
        >
          {submitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : initialProduct ? (
            "আপডেট করুন"
          ) : (
            "পণ্য যোগ করুন"
          )}
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
  onSubmit: (values: ProductFormValues) => Promise<void>;
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
