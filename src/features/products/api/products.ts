import { productListSchema, type Product } from "@/features/products/schemas/product";
import { mockProducts } from "@/features/products/api/products.mock";

export async function fetchProducts(): Promise<Product[]> {
  return productListSchema.parse(mockProducts);
}
