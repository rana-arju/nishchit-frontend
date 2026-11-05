import { apiFetch } from "@/lib/api-client";
import {
  categoryListSchema,
  categorySchema,
  type Category,
} from "@/features/categories/schemas/category";

interface ApiEnvelope<T> {
  data: T;
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/categories");
  return categoryListSchema.parse(response.data);
}

export async function createCategory(name: string): Promise<Category> {
  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/categories", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
  return categorySchema.parse(response.data);
}

export async function renameCategory(id: string, name: string): Promise<Category> {
  const response = await apiFetch<ApiEnvelope<unknown>>(`/api/v1/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
  return categorySchema.parse(response.data);
}

export async function deleteCategory(id: string): Promise<void> {
  await apiFetch(`/api/v1/categories/${id}`, { method: "DELETE" });
}
