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
import { createLoginSchema, type LoginValues } from "@/features/auth/schemas/auth";
import { login } from "@/features/auth/store/auth-slice";
import { useAppDispatch } from "@/store/hooks";

type FormErrors = Partial<Record<keyof LoginValues, string>>;

const initialValues: LoginValues = { email: "", password: "" };

export function LoginForm() {
  const { login: loginContent } = authContent;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [values, setValues] = useState<LoginValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  function handleChange(field: keyof LoginValues) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const result = createLoginSchema().safeParse(values);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof LoginValues] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      await dispatch(login(result.data)).unwrap();
      router.push("/dashboard");
    } catch (error) {
      setFormError(typeof error === "string" ? error : loginContent.submit);
      setStatus("idle");
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
        {loginContent.eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
        {loginContent.title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {loginContent.description}
      </p>

      <div className="mt-6">
        <OauthButtons labels={loginContent.oauth} />
      </div>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
          {loginContent.dividerText}
        </span>
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {formError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {formError}
          </p>
        )}

        <div>
          <label
            htmlFor="login-email"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {loginContent.emailLabel}
          </label>
          <Input
            id="login-email"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            placeholder={loginContent.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            className="mt-2 h-11"
          />
          {errors.email && <p className="text-destructive mt-1.5 text-xs">{errors.email}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {loginContent.passwordLabel}
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-violet-700 hover:underline dark:text-violet-300"
            >
              {loginContent.forgotPasswordLabel}
            </Link>
          </div>
          <PasswordInput
            id="login-password"
            value={values.password}
            onChange={handleChange("password")}
            placeholder={loginContent.passwordPlaceholder}
            aria-invalid={Boolean(errors.password)}
            className="mt-2 h-11"
          />
          {errors.password && <p className="text-destructive mt-1.5 text-xs">{errors.password}</p>}
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
              {loginContent.submitting}
            </>
          ) : (
            loginContent.submit
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        {loginContent.footerPrompt}{" "}
        <Link
          href={loginContent.footerLinkHref}
          className="font-semibold text-violet-700 hover:underline dark:text-violet-300"
        >
          {loginContent.footerLinkLabel}
        </Link>
      </p>
    </div>
  );
}
