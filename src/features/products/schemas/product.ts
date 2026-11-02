import { z } from "zod";

export const PRODUCT_CATEGORIES = [
  "পুরুষদের ফ্যাশন",
  "নারীদের ফ্যাশন",
  "কিডস ফ্যাশন",
  "জুতা ও ব্যাগ",
  "ইলেকট্রনিক্স",
  "হোম ও লিভিং",
  "কসমেটিকস",
  "অন্যান্য",
] as const;

export const productCategorySchema = z.enum(PRODUCT_CATEGORIES);

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: productCategorySchema,
  price: z.number(),
  discountPrice: z.number().optional(),
  imageUrl: z.string().optional(),
  inStock: z.boolean(),
  createdAt: z.string(),
});

export const productListSchema = z.array(productSchema);

export type ProductCategory = z.infer<typeof productCategorySchema>;
export type Product = z.infer<typeof productSchema>;
