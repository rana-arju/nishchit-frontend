import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ShopOnboardingForm } from "@/features/auth/components/shop-onboarding-form";
import { authContent } from "@/features/auth/content";
import { marketingContent } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: `${authContent.onboarding.title} — ${marketingContent.brand}`,
  description: authContent.onboarding.description,
};

export default function OnboardingPage() {
  return (
    <AuthLayout>
      <ShopOnboardingForm />
    </AuthLayout>
  );
}
