import {
  ArrowRight,
  ClipboardPenLine,
  MessageSquareText,
  RotateCcw,
  ShieldCheck,
  TimerReset,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { marketingContent } from "@/features/marketing/content";
import { AnchorLink } from "@/features/marketing/components/anchor-link";
import { Reveal } from "./reveal";

const problemIcons = [ClipboardPenLine, RotateCcw, TimerReset] as const;

const solutionThemes = [
  {
    icon: MessageSquareText,
    border: "border-purple-200/60 dark:border-purple-800/60",
    text: "text-purple-700 dark:text-purple-300",
    bg: "bg-purple-50/80 group-hover:bg-purple-50 dark:bg-purple-950/30 dark:group-hover:bg-purple-950/50",
  },
  {
    icon: ShieldCheck,
    border: "border-blue-200/60 dark:border-blue-800/60",
    text: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-50/80 group-hover:bg-blue-50 dark:bg-blue-950/30 dark:group-hover:bg-blue-950/50",
  },
  {
    icon: Truck,
    border: "border-emerald-200/60 dark:border-emerald-800/60",
    text: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-50/80 group-hover:bg-emerald-50 dark:bg-emerald-950/30 dark:group-hover:bg-emerald-950/50",
  },
] as const;

export function ProblemSection() {
  const { problem } = marketingContent;

  return (
    <section className="relative isolate overflow-hidden bg-slate-50 py-16 transition-colors duration-300 sm:py-24 lg:py-28 dark:bg-slate-950">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-violet-200/35 blur-3xl dark:bg-violet-800/10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-end gap-6 border-b border-slate-200 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-12 dark:border-slate-800">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-violet-700 uppercase dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
              <span className="size-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
              {problem.eyebrow}
            </div>
            <h2 className="mt-5 max-w-2xl text-3xl leading-[1.2] font-bold tracking-[-0.035em] text-balance text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
              {problem.title}
            </h2>
          </Reveal>

          <Reveal>
            <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
              {problem.description}
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:mt-10 lg:gap-5">
          {problem.items.map((item, index) => {
            const Icon = problemIcons[index] ?? ClipboardPenLine;
            const theme = solutionThemes[index] ?? solutionThemes[0];
            const SolutionIcon = theme.icon;

            return (
              <Reveal key={item.title} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/70 sm:p-0 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700 dark:hover:shadow-black/20">
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-5">
                      <span className="grid size-12 place-items-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20">
                        <Icon className="size-5.5" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-sm font-semibold text-slate-300 dark:text-slate-600">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <AnchorLink
                    href="#features"
                    className={cn(
                      "flex items-center gap-2 border-t px-6 py-4 text-sm font-semibold transition-colors sm:px-7",
                      theme.border,
                      theme.bg,
                      theme.text,
                    )}
                  >
                    <SolutionIcon className="size-4 shrink-0" aria-hidden="true" />
                    <span>{item.solvedBy}</span>
                    <ArrowRight
                      className="ml-auto size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </AnchorLink>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
