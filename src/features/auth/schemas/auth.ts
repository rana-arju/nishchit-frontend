import { z } from "zod";
import { authContent } from "@/features/auth/content";

export function createLoginSchema() {
  const { errors } = authContent.login;

  return z.object({
    email: z.string().trim().email(errors.email),
    password: z.string().min(6, errors.password),
  });
}

export function createRegisterSchema() {
  const { errors } = authContent.register;

  return z
    .object({
      name: z.string().trim().min(1, errors.name),
      shop: z.string().trim().min(1, errors.shop),
      email: z.string().trim().email(errors.email),
      password: z.string().min(6, errors.password),
      confirmPassword: z.string().min(6, errors.password),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: errors.confirmPassword,
      path: ["confirmPassword"],
    });
}

export function createForgotPasswordSchema() {
  const { errors } = authContent.forgotPassword;

  return z.object({
    email: z.string().trim().email(errors.email),
  });
}

export function createOnboardingSchema() {
  const { errors } = authContent.onboarding;

  return z.object({
    shop: z.string().trim().min(1, errors.shop),
  });
}

export type LoginValues = z.infer<ReturnType<typeof createLoginSchema>>;
export type RegisterValues = z.infer<ReturnType<typeof createRegisterSchema>>;
export type ForgotPasswordValues = z.infer<ReturnType<typeof createForgotPasswordSchema>>;
export type OnboardingValues = z.infer<ReturnType<typeof createOnboardingSchema>>;
