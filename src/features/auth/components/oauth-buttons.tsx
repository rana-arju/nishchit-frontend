"use client";

import { useRouter } from "next/navigation";
import { FacebookIcon } from "@/features/auth/components/facebook-icon";
import { GoogleIcon } from "@/features/auth/components/google-icon";

type OauthLabels = { google: string; facebook: string };

export function OauthButtons({ labels }: { labels: OauthLabels }) {
  const router = useRouter();

  function handleContinue() {
    router.push("/onboarding");
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={handleContinue}
        className="flex h-11 items-center justify-center gap-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <GoogleIcon className="size-4.5" />
        {labels.google}
      </button>
      <button
        type="button"
        onClick={handleContinue}
        className="flex h-11 items-center justify-center gap-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <FacebookIcon className="size-4.5" />
        {labels.facebook}
      </button>
    </div>
  );
}
