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

export async function refreshSession(): Promise<void> {
  await apiFetch("/api/v1/auth/refresh", { method: "POST" });
}

export async function setShop(shopName: string): Promise<AuthUser> {
  const response = await apiFetch<ApiEnvelope<unknown>>("/api/v1/auth/shop", {
    method: "POST",
    body: JSON.stringify({ shopName }),
  });
  return authUserSchema.parse(response.data);
}

export async function forgotPassword(email: string): Promise<void> {
  await apiFetch("/api/v1/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function verifyOtp(email: string, otp: string): Promise<void> {
  await apiFetch("/api/v1/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ email, otp }),
  });
}

export async function resetPassword(
  email: string,
  otp: string,
  newPassword: string,
): Promise<void> {
  await apiFetch("/api/v1/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, otp, newPassword }),
  });
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await apiFetch("/api/v1/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}
