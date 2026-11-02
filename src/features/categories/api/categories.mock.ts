import type { Category } from "@/features/categories/schemas/category";

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60_000).toISOString();
}

export const mockCategories: Category[] = [
  { id: "cat1", name: "পুরুষদের ফ্যাশন", productCount: 18, createdAt: hoursAgo(400) },
  { id: "cat2", name: "নারীদের ফ্যাশন", productCount: 24, createdAt: hoursAgo(400) },
  { id: "cat3", name: "কিডস ফ্যাশন", productCount: 9, createdAt: hoursAgo(380) },
  { id: "cat4", name: "জুতা ও ব্যাগ", productCount: 12, createdAt: hoursAgo(300) },
  { id: "cat5", name: "ইলেকট্রনিক্স", productCount: 7, createdAt: hoursAgo(250) },
  { id: "cat6", name: "হোম ও লিভিং", productCount: 5, createdAt: hoursAgo(150) },
  { id: "cat7", name: "কসমেটিকস", productCount: 11, createdAt: hoursAgo(100) },
  { id: "cat8", name: "অন্যান্য", productCount: 3, createdAt: hoursAgo(50) },
];
