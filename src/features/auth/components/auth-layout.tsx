import { Check } from "lucide-react";
import Link from "next/link";
import { marketingContent } from "@/features/marketing/content";
import { authContent } from "@/features/auth/content";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { brand, howItWorks } = marketingContent;
  const { panel } = authContent;

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative isolate hidden flex-col justify-between overflow-hidden bg-slate-950 px-10 py-10 text-white dark:bg-[#070b19] lg:flex xl:px-14">
        <div className="hero-grid absolute inset-0 -z-20 opacity-30" aria-hidden="true" />
        <div className="hero-orb hero-orb-left" aria-hidden="true" />
        <div className="hero-orb hero-orb-right" aria-hidden="true" />

        <Link href="/" className="relative z-10 inline-flex items-center gap-2 font-semibold tracking-tight">
          <span className="bg-gradient-brand size-7 rounded-lg" aria-hidden="true" />
          {brand}
        </Link>

        <div className="relative z-10 max-w-md">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1 text-xs font-semibold tracking-wide text-purple-200 backdrop-blur-md">
            <span className="flex size-2 animate-pulse rounded-full bg-purple-400" />
            <span>{panel.eyebrow}</span>
          </div>
          <h2 className="text-3xl leading-[1.2] font-bold tracking-tight text-balance xl:text-4xl">
            {panel.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300 xl:text-base">
            {panel.description}
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {howItWorks.showcase.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm text-slate-200">
                <span className="grid size-5.5 shrink-0 place-items-center rounded-full bg-white/10 text-sky-300">
                  <Check className="size-3.5 stroke-[3]" aria-hidden="true" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-slate-400">{marketingContent.footer.copyright}</p>
      </div>

      <div className="flex flex-col items-center justify-center bg-background px-4 py-10 sm:px-6">
        <div className="mb-8 lg:hidden">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight">
            <span className="bg-gradient-brand size-7 rounded-lg" aria-hidden="true" />
            {brand}
          </Link>
        </div>

        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
