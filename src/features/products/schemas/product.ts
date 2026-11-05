import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  categoryId: z.string(),
  categoryName: z.string(),
  price: z.number(),
  discountPrice: z.number().nullable(),
  imageUrl: z.string().nullable(),
  imagePublicId: z.string().nullable(),
  inStock: z.boolean(),
  createdAt: z.string(),
});

export const productListSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
