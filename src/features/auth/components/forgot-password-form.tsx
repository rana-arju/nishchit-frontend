"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authContent } from "@/features/auth/content";
import { PasswordInput } from "@/features/auth/components/password-input";
import { forgotPassword, resetPassword, verifyOtp } from "@/features/auth/api/auth";
import {
  createForgotPasswordSchema,
  createOtpSchema,
  createResetPasswordSchema,
  type ForgotPasswordValues,
  type OtpValues,
  type ResetPasswordValues,
} from "@/features/auth/schemas/auth";
import { ApiError } from "@/lib/api-client";

type Step = "email" | "otp" | "reset" | "done";

type OtpErrors = Partial<Record<keyof OtpValues, string>>;
type ResetErrors = Partial<Record<keyof ResetPasswordValues, string>>;
type EmailErrors = Partial<Record<keyof ForgotPasswordValues, string>>;

function extractErrorMessage(error: unknown, fallback: string): string {
  return error instanceof ApiError ? error.message : fallback;
}

export function ForgotPasswordForm() {
  const { forgotPassword: content } = authContent;
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetValues, setResetValues] = useState<ResetPasswordValues>({
    newPassword: "",
    confirmPassword: "",
  });

  const [emailErrors, setEmailErrors] = useState<EmailErrors>({});
  const [otpErrors, setOtpErrors] = useState<OtpErrors>({});
  const [resetErrors, setResetErrors] = useState<ResetErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  async function handleEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const result = createForgotPasswordSchema().safeParse({ email });
    if (!result.success) {
      const fieldErrors: EmailErrors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof ForgotPasswordValues] = issue.message;
      }
      setEmailErrors(fieldErrors);
      return;
    }

    setEmailErrors({});
    setStatus("submitting");
    try {
      await forgotPassword(result.data.email);
      setStep("otp");
    } catch (error) {
      setFormError(extractErrorMessage(error, content.submit));
    } finally {
      setStatus("idle");
    }
  }

  async function handleOtpSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const result = createOtpSchema().safeParse({ otp });
    if (!result.success) {
      const fieldErrors: OtpErrors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof OtpValues] = issue.message;
      }
      setOtpErrors(fieldErrors);
      return;
    }

    setOtpErrors({});
    setStatus("submitting");
    try {
      await verifyOtp(email, result.data.otp);
      setOtp(result.data.otp);
      setStep("reset");
    } catch (error) {
      setFormError(extractErrorMessage(error, content.otp.submit));
    } finally {
      setStatus("idle");
    }
  }

  async function handleResendOtp() {
    setFormError(null);
    setResendMessage(null);
    try {
      await forgotPassword(email);
      setResendMessage(content.otp.resendSuccess);
    } catch (error) {
      setFormError(extractErrorMessage(error, content.otp.submit));
    }
  }

  async function handleResetSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const result = createResetPasswordSchema().safeParse(resetValues);
    if (!result.success) {
      const fieldErrors: ResetErrors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof ResetPasswordValues] = issue.message;
      }
      setResetErrors(fieldErrors);
      return;
    }

    setResetErrors({});
    setStatus("submitting");
    try {
      await resetPassword(email, otp, result.data.newPassword);
      setStep("done");
    } catch (error) {
      setFormError(extractErrorMessage(error, content.reset.submit));
    } finally {
      setStatus("idle");
    }
  }

  if (step === "done") {
    return (
      <div className="text-center">
        <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
          {content.reset.eyebrow}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
          {content.done.title}
        </h1>
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
          {content.done.description}
        </p>
        <Link
          href="/login"
          className="bg-gradient-brand text-primary-foreground mt-6 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold hover:opacity-90"
        >
          {content.done.loginLabel}
        </Link>
      </div>
    );
  }

  if (step === "otp") {
    return (
      <div>
        <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
          {content.otp.eyebrow}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
          {content.otp.title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {content.otp.description}
        </p>

        <form onSubmit={handleOtpSubmit} noValidate className="mt-6 flex flex-col gap-4">
          {formError && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {formError}
            </p>
          )}
          {resendMessage && (
            <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
              {resendMessage}
            </p>
          )}

          <div>
            <label
              htmlFor="forgot-otp"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {content.otp.label}
            </label>
            <Input
              id="forgot-otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder={content.otp.placeholder}
              aria-invalid={Boolean(otpErrors.otp)}
              className="mt-2 h-11 text-center tracking-[0.5em]"
            />
            {otpErrors.otp && <p className="text-destructive mt-1.5 text-xs">{otpErrors.otp}</p>}
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
                {content.otp.submitting}
              </>
            ) : (
              content.otp.submit
            )}
          </Button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-2 text-sm">
          <button
            type="button"
            onClick={handleResendOtp}
            className="font-semibold text-violet-700 hover:underline dark:text-violet-300"
          >
            {content.otp.resendLabel}
          </button>
          <button
            type="button"
            onClick={() => setStep("email")}
            className="text-slate-500 hover:underline dark:text-slate-400"
          >
            {content.otp.changeEmailLabel}
          </button>
        </div>
      </div>
    );
  }

  if (step === "reset") {
    return (
      <div>
        <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
          {content.reset.eyebrow}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
          {content.reset.title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {content.reset.description}
        </p>

        <form onSubmit={handleResetSubmit} noValidate className="mt-6 flex flex-col gap-4">
          {formError && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {formError}
            </p>
          )}

          <div>
            <label
              htmlFor="forgot-new-password"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {content.reset.newPasswordLabel}
            </label>
            <PasswordInput
              id="forgot-new-password"
              value={resetValues.newPassword}
              onChange={(event) =>
                setResetValues((prev) => ({ ...prev, newPassword: event.target.value }))
              }
              placeholder={content.reset.newPasswordPlaceholder}
              aria-invalid={Boolean(resetErrors.newPassword)}
              className="mt-2 h-11"
            />
            {resetErrors.newPassword && (
              <p className="text-destructive mt-1.5 text-xs">{resetErrors.newPassword}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="forgot-confirm-password"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {content.reset.confirmPasswordLabel}
            </label>
            <PasswordInput
              id="forgot-confirm-password"
              value={resetValues.confirmPassword}
              onChange={(event) =>
                setResetValues((prev) => ({ ...prev, confirmPassword: event.target.value }))
              }
              placeholder={content.reset.confirmPasswordPlaceholder}
              aria-invalid={Boolean(resetErrors.confirmPassword)}
              className="mt-2 h-11"
            />
            {resetErrors.confirmPassword && (
              <p className="text-destructive mt-1.5 text-xs">{resetErrors.confirmPassword}</p>
            )}
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
                {content.reset.submitting}
              </>
            ) : (
              content.reset.submit
            )}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
        {content.eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
        {content.title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {content.description}
      </p>

      <form onSubmit={handleEmailSubmit} noValidate className="mt-6 flex flex-col gap-4">
        {formError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {formError}
          </p>
        )}

        <div>
          <label
            htmlFor="forgot-email"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {content.emailLabel}
          </label>
          <Input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={content.emailPlaceholder}
            aria-invalid={Boolean(emailErrors.email)}
            className="mt-2 h-11"
          />
          {emailErrors.email && (
            <p className="text-destructive mt-1.5 text-xs">{emailErrors.email}</p>
          )}
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
              {content.submitting}
            </>
          ) : (
            content.submit
          )}
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:underline dark:text-violet-300"
      >
        <ArrowLeft className="size-3.5" />
        {content.backToLoginLabel}
      </Link>
    </div>
  );
}
