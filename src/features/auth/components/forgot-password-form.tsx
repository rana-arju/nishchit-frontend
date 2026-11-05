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
} from "@/features/auth/schemas/auth";
import { useValidatedForm } from "@/hooks/use-validated-form";
import { ApiError } from "@/lib/api-client";

type Step = "email" | "otp" | "reset" | "done";

function extractErrorMessage(error: unknown, fallback: string): string {
  return error instanceof ApiError ? error.message : fallback;
}

export function ForgotPasswordForm() {
  const { forgotPassword: content } = authContent;
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const emailForm = useValidatedForm(createForgotPasswordSchema, { email: "" });
  const otpForm = useValidatedForm(createOtpSchema, { otp: "" });
  const resetForm = useValidatedForm(createResetPasswordSchema, {
    newPassword: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  async function handleEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const data = emailForm.validateAll();
    if (!data) return;

    setStatus("submitting");
    try {
      await forgotPassword(data.email);
      setEmail(data.email);
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

    const data = otpForm.validateAll();
    if (!data) return;

    setStatus("submitting");
    try {
      await verifyOtp(email, data.otp);
      setOtp(data.otp);
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

    const data = resetForm.validateAll();
    if (!data) return;

    setStatus("submitting");
    try {
      await resetPassword(email, otp, data.newPassword);
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
              value={otpForm.values.otp}
              onChange={(event) =>
                otpForm.setFieldValue("otp", event.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder={content.otp.placeholder}
              aria-invalid={Boolean(otpForm.errors.otp)}
              className="mt-2 h-11 text-center tracking-[0.5em]"
            />
            {otpForm.errors.otp && (
              <p className="text-destructive mt-1.5 text-xs">{otpForm.errors.otp}</p>
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
              value={resetForm.values.newPassword}
              onChange={resetForm.handleChange("newPassword")}
              placeholder={content.reset.newPasswordPlaceholder}
              aria-invalid={Boolean(resetForm.errors.newPassword)}
              className="mt-2 h-11"
            />
            {resetForm.errors.newPassword && (
              <p className="text-destructive mt-1.5 text-xs">{resetForm.errors.newPassword}</p>
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
              value={resetForm.values.confirmPassword}
              onChange={resetForm.handleChange("confirmPassword")}
              placeholder={content.reset.confirmPasswordPlaceholder}
              aria-invalid={Boolean(resetForm.errors.confirmPassword)}
              className="mt-2 h-11"
            />
            {resetForm.errors.confirmPassword && (
              <p className="text-destructive mt-1.5 text-xs">{resetForm.errors.confirmPassword}</p>
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
            value={emailForm.values.email}
            onChange={emailForm.handleChange("email")}
            placeholder={content.emailPlaceholder}
            aria-invalid={Boolean(emailForm.errors.email)}
            className="mt-2 h-11"
          />
          {emailForm.errors.email && (
            <p className="text-destructive mt-1.5 text-xs">{emailForm.errors.email}</p>
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
