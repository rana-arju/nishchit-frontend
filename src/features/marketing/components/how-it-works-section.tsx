import { Check, Sparkles } from "lucide-react";
import { marketingContent } from "@/features/marketing/content";
import { DashboardPreview } from "./dashboard-preview";
import { ProcessSteps } from "./process-steps";
import { Reveal } from "./reveal";

export function HowItWorksSection() {
  const { howItWorks } = marketingContent;
  const { showcase } = howItWorks;

  return (
    <section
      id="how-it-works"
      className="relative isolate scroll-mt-16 overflow-hidden bg-slate-50 py-16 text-slate-950 transition-colors duration-300 sm:py-24 lg:py-28 dark:bg-slate-950 dark:text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_15%,rgba(99,102,241,0.1),transparent_30%),radial-gradient(circle_at_88%_75%,rgba(192,38,211,0.07),transparent_28%)] dark:bg-[radial-gradient(circle_at_12%_15%,rgba(99,102,241,0.2),transparent_30%),radial-gradient(circle_at_88%_75%,rgba(192,38,211,0.14),transparent_28%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:3rem_3rem] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-violet-700 uppercase dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-200">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {howItWorks.eyebrow}
          </div>
          <h2 className="text-3xl leading-tight font-bold tracking-[-0.035em] text-balance sm:text-4xl lg:text-5xl">
            {howItWorks.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
            One connected workflow turns every customer conversation into an order your team can
            confirm, send and track.
          </p>
        </Reveal>

        <ProcessSteps steps={howItWorks.steps} />

        <div className="mt-16 grid items-center gap-10 lg:mt-24 lg:grid-cols-[minmax(0,1.18fr)_minmax(20rem,0.82fr)] lg:gap-16">
          <Reveal>
            <DashboardPreview dashboard={showcase.dashboard} />
          </Reveal>

          <Reveal>
            <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
              Built for daily selling
            </p>
            <h3 className="mt-3 text-3xl leading-tight font-bold tracking-[-0.03em] text-balance sm:text-4xl">
              {showcase.headline}
            </h3>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {showcase.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm dark:border-white/8 dark:bg-white/5 dark:text-slate-200 dark:shadow-none"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300">
                    <Check className="size-3.5 stroke-[3]" aria-hidden="true" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-20">
          <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-xl shadow-slate-200/60 backdrop-blur-md lg:grid-cols-4 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-2xl dark:shadow-black/20">
            {showcase.stats.map((stat) => (
              <div
                key={stat.label}
                className="border-slate-200 px-4 py-6 text-center even:border-l sm:px-6 lg:border-l lg:py-7 lg:first:border-l-0 dark:border-white/10"
              >
                <dd className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
