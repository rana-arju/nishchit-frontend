import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { RegisterForm } from "@/features/auth/components/register-form";
import { authContent } from "@/features/auth/content";
import { marketingContent } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: `${authContent.register.title} — ${marketingContent.brand}`,
  description: authContent.register.description,
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
