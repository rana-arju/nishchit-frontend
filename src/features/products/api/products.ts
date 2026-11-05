import { z } from "zod";
import { apiFetch } from "@/lib/api-client";
import {
  productListSchema,
  productSchema,
  type Product,
} from "@/features/products/schemas/product";

interface ApiEnvelope<T> {
  data: T;
}

export interface ProductPayload {
  name: string;
  description: string;
  categoryId: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string | null;
  imagePublicId: string | null;
  inStock: boolean;
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/products");
  return productListSchema.parse(response.data);
}

export async function fetchProduct(id: string): Promise<Product> {
  const response = await apiFetch<ApiEnvelope<unknown>>(`/api/v1/products/${id}`);
  return productSchema.parse(response.data);
}

export async function createProduct(payload: ProductPayload): Promise<Product> {
  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return productSchema.parse(response.data);
}

export async function updateProduct(id: string, payload: ProductPayload): Promise<Product> {
  const response = await apiFetch<ApiEnvelope<unknown>>(`/api/v1/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return productSchema.parse(response.data);
}

export async function deleteProduct(id: string): Promise<void> {
  await apiFetch(`/api/v1/products/${id}`, { method: "DELETE" });
}

const imageUploadResponseSchema = z.object({
  imageUrl: z.string(),
  imagePublicId: z.string(),
});

export async function uploadProductImage(
  file: File,
): Promise<{ imageUrl: string; imagePublicId: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/products/upload-image", {
    method: "POST",
    body: formData,
  });
  return imageUploadResponseSchema.parse(response.data);
}
