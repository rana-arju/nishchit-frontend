"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authContent } from "@/features/auth/content";
import {
  createForgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/features/auth/schemas/auth";

type FormErrors = Partial<Record<keyof ForgotPasswordValues, string>>;

const initialValues: ForgotPasswordValues = { email: "" };

export function ForgotPasswordForm() {
  const { forgotPassword } = authContent;
  const [values, setValues] = useState<ForgotPasswordValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = createForgotPasswordSchema().safeParse(values);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof ForgotPasswordValues] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
          {forgotPassword.eyebrow}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
          {forgotPassword.title}
        </h1>
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
          {forgotPassword.success}
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:underline dark:text-violet-300"
        >
          <ArrowLeft className="size-3.5" />
          {forgotPassword.backToLoginLabel}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
        {forgotPassword.eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
        {forgotPassword.title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {forgotPassword.description}
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <div>
          <label
            htmlFor="forgot-email"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {forgotPassword.emailLabel}
          </label>
          <Input
            id="forgot-email"
            type="email"
            value={values.email}
            onChange={(event) => setValues({ email: event.target.value })}
            placeholder={forgotPassword.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            className="mt-2 h-11"
          />
          {errors.email && <p className="text-destructive mt-1.5 text-xs">{errors.email}</p>}
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
              {forgotPassword.submitting}
            </>
          ) : (
            forgotPassword.submit
          )}
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:underline dark:text-violet-300"
      >
        <ArrowLeft className="size-3.5" />
        {forgotPassword.backToLoginLabel}
      </Link>
    </div>
  );
}
