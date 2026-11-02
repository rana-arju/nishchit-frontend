import { z } from "zod";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  productCount: z.number(),
  createdAt: z.string(),
});

export const categoryListSchema = z.array(categorySchema);

export type Category = z.infer<typeof categorySchema>;
