import { categoryListSchema, type Category } from "@/features/categories/schemas/category";
import { mockCategories } from "@/features/categories/api/categories.mock";

export async function fetchCategories(): Promise<Category[]> {
  return categoryListSchema.parse(mockCategories);
}
