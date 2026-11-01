"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { marketingContent } from "@/features/marketing/content";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: "", email: "", message: "" };

export function ContactForm() {
  const { form } = marketingContent.contact;
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const schema = z.object({
    name: z.string().trim().min(1, form.errors.name),
    email: z.string().trim().email(form.errors.email),
    message: z.string().trim().min(10, form.errors.message),
  });

  function handleChange(field: keyof FormValues) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormValues;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("success");
    setValues(initialValues);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900/60"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor="contact-name"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {form.nameLabel}
          </label>
          <Input
            id="contact-name"
            name="name"
            value={values.name}
            onChange={handleChange("name")}
            placeholder={form.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            className="mt-2 h-11"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="contact-email"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {form.emailLabel}
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            placeholder={form.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            className="mt-2 h-11"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="contact-message"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {form.messageLabel}
          </label>
          <Textarea
            id="contact-message"
            name="message"
            value={values.message}
            onChange={handleChange("message")}
            placeholder={form.messagePlaceholder}
            aria-invalid={Boolean(errors.message)}
            className="mt-2 min-h-32"
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="bg-gradient-brand text-primary-foreground mt-6 h-11 w-full rounded-full text-sm font-semibold hover:opacity-90 sm:w-auto sm:px-8"
      >
        {form.submit}
      </Button>

      {status === "success" && (
        <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          {form.success}
        </p>
      )}
    </form>
  );
}
