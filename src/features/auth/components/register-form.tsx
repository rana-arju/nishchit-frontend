"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authContent } from "@/features/auth/content";
import { OauthButtons } from "@/features/auth/components/oauth-buttons";
import { PasswordInput } from "@/features/auth/components/password-input";
import { createRegisterSchema, type RegisterValues } from "@/features/auth/schemas/auth";
import { register } from "@/features/auth/store/auth-slice";
import { useValidatedForm } from "@/hooks/use-validated-form";
import { useAppDispatch } from "@/store/hooks";

const initialValues: RegisterValues = {
  name: "",
  shop: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function RegisterForm() {
  const { register: registerContent } = authContent;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { values, errors, handleChange, validateAll } = useValidatedForm(
    createRegisterSchema,
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
      await dispatch(
        register({
          name: data.name,
          shopName: data.shop,
          email: data.email,
          password: data.password,
        }),
      ).unwrap();
      router.push("/dashboard");
    } catch (error) {
      setFormError(typeof error === "string" ? error : registerContent.submit);
      setStatus("idle");
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
        {registerContent.eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
        {registerContent.title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {registerContent.description}
      </p>

      <div className="mt-6">
        <OauthButtons labels={registerContent.oauth} />
      </div>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
          {registerContent.dividerText}
        </span>
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {formError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {formError}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="register-name"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {registerContent.nameLabel}
            </label>
            <Input
              id="register-name"
              value={values.name}
              onChange={handleChange("name")}
              placeholder={registerContent.namePlaceholder}
              aria-invalid={Boolean(errors.name)}
              className="mt-2 h-11"
            />
            {errors.name && <p className="text-destructive mt-1.5 text-xs">{errors.name}</p>}
          </div>

          <div>
            <label
              htmlFor="register-shop"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {registerContent.shopLabel}
            </label>
            <Input
              id="register-shop"
              value={values.shop}
              onChange={handleChange("shop")}
              placeholder={registerContent.shopPlaceholder}
              aria-invalid={Boolean(errors.shop)}
              className="mt-2 h-11"
            />
            {errors.shop && <p className="text-destructive mt-1.5 text-xs">{errors.shop}</p>}
          </div>
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {registerContent.emailLabel}
          </label>
          <Input
            id="register-email"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            placeholder={registerContent.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            className="mt-2 h-11"
          />
          {errors.email && <p className="text-destructive mt-1.5 text-xs">{errors.email}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="register-password"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {registerContent.passwordLabel}
            </label>
            <PasswordInput
              id="register-password"
              value={values.password}
              onChange={handleChange("password")}
              placeholder={registerContent.passwordPlaceholder}
              aria-invalid={Boolean(errors.password)}
              className="mt-2 h-11"
            />
            {errors.password && (
              <p className="text-destructive mt-1.5 text-xs">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="register-confirm-password"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {registerContent.confirmPasswordLabel}
            </label>
            <PasswordInput
              id="register-confirm-password"
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder={registerContent.confirmPasswordPlaceholder}
              aria-invalid={Boolean(errors.confirmPassword)}
              className="mt-2 h-11"
            />
            {errors.confirmPassword && (
              <p className="text-destructive mt-1.5 text-xs">{errors.confirmPassword}</p>
            )}
          </div>
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
              {registerContent.submitting}
            </>
          ) : (
            registerContent.submit
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        {registerContent.footerPrompt}{" "}
        <Link
          href={registerContent.footerLinkHref}
          className="font-semibold text-violet-700 hover:underline dark:text-violet-300"
        >
          {registerContent.footerLinkLabel}
        </Link>
      </p>
    </div>
  );
}
