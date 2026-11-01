import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { authContent } from "@/features/auth/content";
import { marketingContent } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: `${authContent.forgotPassword.title} — ${marketingContent.brand}`,
  description: authContent.forgotPassword.description,
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
