import { z } from "zod";

export const shopSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const authUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  shop: shopSchema.nullable(),
});

export type Shop = z.infer<typeof shopSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;
