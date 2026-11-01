import { ArrowRight, Check, Play } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { marketingContent } from "@/features/marketing/content";
import { cn } from "@/lib/utils";
import { HeroVisual } from "./hero-visual";
import { Reveal } from "./reveal";

export function HeroSection() {
  const { hero } = marketingContent;
  const proofPoints = hero.proofPoints || [
    "No coding needed",
    "Set up in minutes",
    "Built for Bangladeshi sellers",
  ];

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-slate-950 text-white dark:bg-[#070b19] transition-colors duration-300 py-10 sm:py-16 lg:min-h-[calc(100svh-4rem)] lg:py-24">
      {/* Background radial glows and atmospheric effects matching the screenshot */}
      <div className="hero-grid absolute inset-0 -z-20 opacity-30" aria-hidden="true" />
      <div className="hero-orb-top" aria-hidden="true" />
      <div className="hero-orb hero-orb-left" aria-hidden="true" />
      <div className="hero-orb hero-orb-right" aria-hidden="true" />

      {/* Subtle sweeping neon streak along bottom */}
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-[45rem] rounded-full bg-gradient-to-tr from-sky-500/25 via-blue-600/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-0 h-80 w-[45rem] rounded-full bg-gradient-to-tl from-fuchsia-600/25 via-purple-600/15 to-transparent blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        {/* Left Column: Copy & Actions */}
        <Reveal className="relative z-10 text-center lg:text-left">
          {/* Eyebrow Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1 text-[11px] sm:text-xs font-semibold tracking-wide text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.25)] backdrop-blur-md">
            <span className="flex size-2 rounded-full bg-purple-400 animate-pulse" />
            <span>{hero.badge || "AI Order Assistant for Facebook Sellers"}</span>
          </div>

          {/* Main Headline */}
          <h1 className="mx-auto max-w-xl text-3xl leading-[1.15] font-extrabold tracking-tight text-white sm:text-5xl lg:mx-0 lg:text-6xl">
            <span>Turn Messenger Chats into Confirmed Orders — </span>
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.45)]">
              Automatically
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-lg lg:mx-0">
            {hero.description}
          </p>

          {/* CTA Buttons matching screenshot pill design */}
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4 lg:justify-start">
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group relative h-12 sm:h-13 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 px-6 sm:px-7 text-sm font-bold text-white shadow-[0_0_30px_rgba(147,51,234,0.55)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(147,51,234,0.75)] active:scale-95 justify-center",
              )}
            >
              <span>{hero.primaryAction}</span>
              <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>

            <Link
              href="#how-it-works"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "group flex h-12 sm:h-13 items-center justify-center gap-2.5 rounded-full border border-white/25 bg-slate-900/60 px-6 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/10 active:scale-95",
              )}
            >
              <div className="flex size-6 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform group-hover:scale-110">
                <Play className="size-3 fill-current translate-x-0.5" aria-hidden="true" />
              </div>
              <span>{hero.secondaryAction}</span>
            </Link>
          </div>

          {/* Proof Points */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-300 sm:mt-10 sm:gap-x-6 sm:gap-y-3 sm:text-sm lg:justify-start">
            {proofPoints.map((point) => (
              <li key={point} className="flex items-center gap-1.5 sm:gap-2">
                <Check className="size-3.5 sm:size-4 text-sky-400 stroke-[2.5]" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right Column: Interactive Phone + Glowing Flow Mockup */}
        <Reveal className="relative z-10 w-full mt-2 lg:mt-0">
          <HeroVisual hero={hero} />
        </Reveal>
      </div>
    </section>
  );
}

