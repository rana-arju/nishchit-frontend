"use client";

import { Bell, Eye, EyeOff, ImagePlus, KeyRound, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { changePassword } from "@/features/auth/api/auth";
import { authContent } from "@/features/auth/content";
import {
  createChangePasswordSchema,
  type ChangePasswordValues,
} from "@/features/auth/schemas/auth";
import { ApiError } from "@/lib/api-client";

const shopSchema = z.object({
  shop: z.string().trim().min(1, "Shop or page name is required"),
});

type PasswordErrors = Partial<Record<keyof ChangePasswordValues, string>>;

const initialPasswordValues: ChangePasswordValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function passwordStrength(password: string): { label: string; className: string; score: number } {
  if (!password) return { label: "", className: "", score: 0 };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "দুর্বল", className: "bg-destructive w-1/4", score };
  if (score === 2) return { label: "মাঝারি", className: "bg-chart-3 w-2/4", score };
  if (score === 3) return { label: "ভালো", className: "bg-chart-2 w-3/4", score };
  return { label: "শক্তিশালী", className: "bg-chart-4 w-full", score };
}

export function SettingsForm() {
  const [shop, setShop] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [shopError, setShopError] = useState<string>();
  const [shopSaved, setShopSaved] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [password, setPassword] = useState<ChangePasswordValues>(initialPasswordValues);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});
  const [passwordFormError, setPasswordFormError] = useState<string | null>(null);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<"idle" | "submitting">("idle");

  const [notifications, setNotifications] = useState({
    orderAlerts: true,
    chatbotReports: true,
    marketingTips: false,
  });

  useEffect(() => {
    return () => {
      if (avatarUrl) URL.revokeObjectURL(avatarUrl);
    };
  }, [avatarUrl]);

  function handleAvatarSelect(file: File) {
    if (avatarUrl) URL.revokeObjectURL(avatarUrl);
    setAvatarUrl(URL.createObjectURL(file));
  }

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

  async function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordFormError(null);
    setPasswordSaved(false);

    const result = createChangePasswordSchema().safeParse(password);
    if (!result.success) {
      const fieldErrors: PasswordErrors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof ChangePasswordValues] = issue.message;
      }
      setPasswordErrors(fieldErrors);
      return;
    }

    setPasswordErrors({});
    setPasswordStatus("submitting");
    try {
      await changePassword(result.data.currentPassword, result.data.newPassword);
      setPasswordSaved(true);
      setPassword(initialPasswordValues);
    } catch (error) {
      setPasswordFormError(
        error instanceof ApiError ? error.message : authContent.changePassword.submit,
      );
    } finally {
      setPasswordStatus("idle");
    }
  }

  const strength = passwordStrength(password.newPassword);

  return (
    <div className="flex max-w-xl flex-col gap-6">
      <Card className="border-transparent shadow-sm ring-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Store className="text-muted-foreground size-4.5" />
            Shop profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleShopSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <label className="border-border bg-muted/40 hover:bg-muted relative size-16 shrink-0 cursor-pointer overflow-hidden rounded-full border border-dashed transition-colors">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local blob preview
                  <img src={avatarUrl} alt="" className="size-full object-cover" />
                ) : (
                  <span className="text-muted-foreground flex size-full items-center justify-center">
                    <ImagePlus className="size-5" />
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) handleAvatarSelect(file);
                    event.target.value = "";
                  }}
                />
              </label>
              <p className="font-bangla text-muted-foreground text-xs leading-relaxed">
                আপনার শপের লোগো আপলোড করুন (ঐচ্ছিক)
              </p>
            </div>

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

            <div>
              <label htmlFor="settings-shop-description" className="text-sm font-medium">
                <span className="font-bangla">শপ বিবরণ</span>{" "}
                <span className="text-muted-foreground font-normal">(ঐচ্ছিক)</span>
              </label>
              <Textarea
                id="settings-shop-description"
                value={shopDescription}
                onChange={(event) => setShopDescription(event.target.value)}
                placeholder="আপনার শপ সম্পর্কে সংক্ষিপ্ত বিবরণ লিখুন..."
                className="font-bangla mt-2 min-h-20"
              />
            </div>

            <Button type="submit" size="sm" className="w-fit">
              Save
            </Button>
            {shopSaved && (
              <p className="text-chart-4 font-bangla text-xs font-medium">সংরক্ষণ করা হয়েছে।</p>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className="border-transparent shadow-sm ring-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <KeyRound className="text-muted-foreground size-4.5" />
            Change password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} noValidate className="flex flex-col gap-3">
            {passwordFormError && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                {passwordFormError}
              </p>
            )}

            <div>
              <label htmlFor="settings-current-password" className="text-sm font-medium">
                {authContent.changePassword.currentPasswordLabel}
              </label>
              <div className="relative mt-2">
                <Input
                  id="settings-current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={password.currentPassword}
                  onChange={(event) =>
                    setPassword((prev) => ({ ...prev, currentPassword: event.target.value }))
                  }
                  aria-invalid={Boolean(passwordErrors.currentPassword)}
                  className="h-10 pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2"
                >
                  {showCurrentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="text-destructive mt-1.5 text-xs">{passwordErrors.currentPassword}</p>
              )}
            </div>
            <Separator />
            <div>
              <label htmlFor="settings-password" className="text-sm font-medium">
                {authContent.changePassword.newPasswordLabel}
              </label>
              <div className="relative mt-2">
                <Input
                  id="settings-password"
                  type={showPassword ? "text" : "password"}
                  value={password.newPassword}
                  onChange={(event) =>
                    setPassword((prev) => ({ ...prev, newPassword: event.target.value }))
                  }
                  aria-invalid={Boolean(passwordErrors.newPassword)}
                  className="h-10 pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {password.newPassword && (
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="bg-muted h-1 flex-1 overflow-hidden rounded-full">
                    <div className={`h-full rounded-full transition-all ${strength.className}`} />
                  </div>
                  <span className="font-bangla text-muted-foreground w-14 text-[11px]">
                    {strength.label}
                  </span>
                </div>
              )}
              {passwordErrors.newPassword && (
                <p className="text-destructive mt-1.5 text-xs">{passwordErrors.newPassword}</p>
              )}
            </div>
            <Separator />
            <div>
              <label htmlFor="settings-confirm-password" className="text-sm font-medium">
                {authContent.changePassword.confirmPasswordLabel}
              </label>
              <div className="relative mt-2">
                <Input
                  id="settings-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={password.confirmPassword}
                  onChange={(event) =>
                    setPassword((prev) => ({ ...prev, confirmPassword: event.target.value }))
                  }
                  aria-invalid={Boolean(passwordErrors.confirmPassword)}
                  className="h-10 pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="text-destructive mt-1.5 text-xs">{passwordErrors.confirmPassword}</p>
              )}
            </div>
            <Button
              type="submit"
              size="sm"
              className="w-fit"
              disabled={passwordStatus === "submitting"}
            >
              {passwordStatus === "submitting"
                ? authContent.changePassword.submitting
                : authContent.changePassword.submit}
            </Button>
            {passwordSaved && (
              <p className="text-chart-4 font-bangla text-xs font-medium">
                {authContent.changePassword.success}
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className="border-transparent shadow-sm ring-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="text-muted-foreground size-4.5" />
            <span className="font-bangla">নোটিফিকেশন</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-bangla text-sm font-medium">অর্ডার অ্যালার্ট</p>
              <p className="font-bangla text-muted-foreground text-xs">
                নতুন ও উচ্চ ঝুঁকিপূর্ণ অর্ডারের জন্য নোটিফিকেশন পান।
              </p>
            </div>
            <Switch
              checked={notifications.orderAlerts}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, orderAlerts: checked }))
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-bangla text-sm font-medium">এআই চ্যাটবট রিপোর্ট</p>
              <p className="font-bangla text-muted-foreground text-xs">
                সাপ্তাহিক চ্যাটবট কর্মক্ষমতার সারাংশ পান।
              </p>
            </div>
            <Switch
              checked={notifications.chatbotReports}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, chatbotReports: checked }))
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-bangla text-sm font-medium">মার্কেটিং টিপস</p>
              <p className="font-bangla text-muted-foreground text-xs">
                বিক্রি বাড়ানোর টিপস ও আপডেট পান।
              </p>
            </div>
            <Switch
              checked={notifications.marketingTips}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, marketingTips: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
