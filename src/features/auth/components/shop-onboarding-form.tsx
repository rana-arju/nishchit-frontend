"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authContent } from "@/features/auth/content";
import { createOnboardingSchema, type OnboardingValues } from "@/features/auth/schemas/auth";
import { saveShop } from "@/features/auth/store/auth-slice";
import { useValidatedForm } from "@/hooks/use-validated-form";
import { useAppDispatch } from "@/store/hooks";

const initialValues: OnboardingValues = { shop: "" };

export function ShopOnboardingForm() {
  const { onboarding } = authContent;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { values, errors, handleChange, validateAll } = useValidatedForm(
    createOnboardingSchema,
    initialValues,
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const data = validateAll();
    if (!data) return;

    setStatus("submitting");

    try {
      await dispatch(saveShop(data.shop)).unwrap();
      router.push("/dashboard");
    } catch (error) {
      setFormError(typeof error === "string" ? error : onboarding.submit);
      setStatus("idle");
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
        {onboarding.eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
        {onboarding.title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {onboarding.description}
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        {formError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {formError}
          </p>
        )}

        <div>
          <label
            htmlFor="onboarding-shop"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {onboarding.shopLabel}
          </label>
          <Input
            id="onboarding-shop"
            value={values.shop}
            onChange={handleChange("shop")}
            placeholder={onboarding.shopPlaceholder}
            aria-invalid={Boolean(errors.shop)}
            className="mt-2 h-11"
          />
          {errors.shop && <p className="text-destructive mt-1.5 text-xs">{errors.shop}</p>}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="bg-gradient-brand text-primary-foreground mt-2 h-11 w-full rounded-full text-sm font-semibold hover:opacity-90"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {onboarding.submitting}
            </>
          ) : (
            onboarding.submit
          )}
        </Button>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          {onboarding.skipLabel}
        </button>
      </form>
    </div>
  );
}
