import { apiFetch } from "@/lib/api-client";
import { authUserSchema, type AuthUser } from "@/features/auth/schemas/api";

interface ApiEnvelope<T> {
  data: T;
}

export interface RegisterPayload {
  name: string;
  shopName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function registerUser(payload: RegisterPayload): Promise<AuthUser> {
  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return authUserSchema.parse(response.data);
}

export async function loginUser(payload: LoginPayload): Promise<AuthUser> {
  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return authUserSchema.parse(response.data);
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/auth/me");
  return authUserSchema.parse(response.data);
}

export async function logoutUser(): Promise<void> {
  await apiFetch("/api/v1/auth/logout", { method: "POST" });
}

export async function setShop(shopName: string): Promise<AuthUser> {
  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/auth/shop", {
    method: "POST",
    body: JSON.stringify({ shopName }),
  });
  return authUserSchema.parse(response.data);
}
