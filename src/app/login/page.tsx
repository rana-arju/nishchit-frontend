import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { LoginForm } from "@/features/auth/components/login-form";
import { authContent } from "@/features/auth/content";
import { marketingContent } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: `${authContent.login.title} — ${marketingContent.brand}`,
  description: authContent.login.description,
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
