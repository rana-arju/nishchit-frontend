"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authContent } from "@/features/auth/content";
import { OauthButtons } from "@/features/auth/components/oauth-buttons";
import { PasswordInput } from "@/features/auth/components/password-input";
import { createRegisterSchema, type RegisterValues } from "@/features/auth/schemas/auth";

type FormErrors = Partial<Record<keyof RegisterValues, string>>;

const initialValues: RegisterValues = {
  name: "",
  shop: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function RegisterForm() {
  const { register } = authContent;
  const [values, setValues] = useState<RegisterValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  function handleChange(field: keyof RegisterValues) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = createRegisterSchema().safeParse(values);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof RegisterValues] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
  }

  return (
    <div>
      <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
        {register.eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
        {register.title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {register.description}
      </p>

      <div className="mt-6">
        <OauthButtons labels={register.oauth} />
      </div>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
          {register.dividerText}
        </span>
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="register-name"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {register.nameLabel}
            </label>
            <Input
              id="register-name"
              value={values.name}
              onChange={handleChange("name")}
              placeholder={register.namePlaceholder}
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
              {register.shopLabel}
            </label>
            <Input
              id="register-shop"
              value={values.shop}
              onChange={handleChange("shop")}
              placeholder={register.shopPlaceholder}
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
            {register.emailLabel}
          </label>
          <Input
            id="register-email"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            placeholder={register.emailPlaceholder}
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
              {register.passwordLabel}
            </label>
            <PasswordInput
              id="register-password"
              value={values.password}
              onChange={handleChange("password")}
              placeholder={register.passwordPlaceholder}
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
              {register.confirmPasswordLabel}
            </label>
            <PasswordInput
              id="register-confirm-password"
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder={register.confirmPasswordPlaceholder}
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
              {register.submitting}
            </>
          ) : (
            register.submit
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        {register.footerPrompt}{" "}
        <Link
          href={register.footerLinkHref}
          className="font-semibold text-violet-700 hover:underline dark:text-violet-300"
        >
          {register.footerLinkLabel}
        </Link>
      </p>
    </div>
  );
}
