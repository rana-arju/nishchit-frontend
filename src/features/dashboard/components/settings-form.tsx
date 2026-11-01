"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const shopSchema = z.object({
  shop: z.string().trim().min(1, "Shop or page name is required"),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, "Use at least 6 characters"),
    confirmPassword: z.string().min(6, "Use at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SettingsForm() {
  const [shop, setShop] = useState("");
  const [shopError, setShopError] = useState<string>();
  const [shopSaved, setShopSaved] = useState(false);

  const [password, setPassword] = useState({ password: "", confirmPassword: "" });
  const [passwordErrors, setPasswordErrors] = useState<Partial<Record<"password" | "confirmPassword", string>>>({});
  const [passwordSaved, setPasswordSaved] = useState(false);

  function handleShopSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = shopSchema.safeParse({ shop });
    if (!result.success) {
      setShopError(result.error.issues[0]?.message);
      setShopSaved(false);
      return;
    }
    setShopError(undefined);
    setShopSaved(true);
  }

  function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      const fieldErrors: typeof passwordErrors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as "password" | "confirmPassword"] = issue.message;
      }
      setPasswordErrors(fieldErrors);
      setPasswordSaved(false);
      return;
    }
    setPasswordErrors({});
    setPasswordSaved(true);
    setPassword({ password: "", confirmPassword: "" });
  }

  return (
    <div className="flex max-w-xl flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Shop profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleShopSubmit} noValidate className="flex flex-col gap-3">
            <div>
              <label htmlFor="settings-shop" className="text-sm font-medium">
                Shop / page name
              </label>
              <Input
                id="settings-shop"
                value={shop}
                onChange={(event) => {
                  setShop(event.target.value);
                  setShopSaved(false);
                }}
                placeholder="Your Facebook page name"
                aria-invalid={Boolean(shopError)}
                className="mt-2 h-10"
              />
              {shopError && <p className="text-destructive mt-1.5 text-xs">{shopError}</p>}
            </div>
            <Button type="submit" size="sm" className="w-fit">
              Save
            </Button>
            {shopSaved && (
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Saved.
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} noValidate className="flex flex-col gap-3">
            <div>
              <label htmlFor="settings-password" className="text-sm font-medium">
                New password
              </label>
              <Input
                id="settings-password"
                type="password"
                value={password.password}
                onChange={(event) =>
                  setPassword((prev) => ({ ...prev, password: event.target.value }))
                }
                aria-invalid={Boolean(passwordErrors.password)}
                className="mt-2 h-10"
              />
              {passwordErrors.password && (
                <p className="text-destructive mt-1.5 text-xs">{passwordErrors.password}</p>
              )}
            </div>
            <Separator />
            <div>
              <label htmlFor="settings-confirm-password" className="text-sm font-medium">
                Confirm password
              </label>
              <Input
                id="settings-confirm-password"
                type="password"
                value={password.confirmPassword}
                onChange={(event) =>
                  setPassword((prev) => ({ ...prev, confirmPassword: event.target.value }))
                }
                aria-invalid={Boolean(passwordErrors.confirmPassword)}
                className="mt-2 h-10"
              />
              {passwordErrors.confirmPassword && (
                <p className="text-destructive mt-1.5 text-xs">{passwordErrors.confirmPassword}</p>
              )}
            </div>
            <Button type="submit" size="sm" className="w-fit">
              Update password
            </Button>
            {passwordSaved && (
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Password updated.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
