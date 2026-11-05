import { FacebookIcon } from "@/features/auth/components/facebook-icon";
import { GoogleIcon } from "@/features/auth/components/google-icon";
import { env } from "@/lib/env";

type OauthLabels = { google: string; facebook: string };

const OAUTH_BUTTON_CLASSES =
  "flex h-11 items-center justify-center gap-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

export function OauthButtons({ labels }: { labels: OauthLabels }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <a
        href={`${env.NEXT_PUBLIC_API_URL}/api/v1/auth/google/login`}
        className={OAUTH_BUTTON_CLASSES}
      >
        <GoogleIcon className="size-4.5" />
        {labels.google}
      </a>
      <a
        href={`${env.NEXT_PUBLIC_API_URL}/api/v1/auth/facebook/login`}
        className={OAUTH_BUTTON_CLASSES}
      >
        <FacebookIcon className="size-4.5" />
        {labels.facebook}
      </a>
    </div>
  );
}
