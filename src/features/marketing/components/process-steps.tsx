import { ArrowDown, ArrowRight, MessageSquare, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Reveal } from "./reveal";

const stepIcons = {
  order: MessageSquare,
  ai: Sparkles,
  confirm: ShieldCheck,
  track: Truck,
};

type ProcessStep = {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly key: keyof typeof stepIcons;
  readonly color: string;
};

export function ProcessSteps({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <ol className="relative mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-5">
      {steps.map((step, index) => {
        const Icon = stepIcons[step.key];

        return (
          <Reveal key={step.key} className="relative">
            <li className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/70 sm:p-6 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none dark:hover:border-violet-400/40 dark:hover:bg-white/[0.09]">
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`grid size-11 place-items-center rounded-xl border border-black/5 shadow-sm transition-transform duration-300 group-hover:scale-105 dark:border-white/10 ${step.color}`}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-500">
                  0{step.number}
                </span>
              </div>
              <h3 className="mt-7 text-lg font-semibold tracking-tight">
                {step.title.replace(/^\d+\.\s*/, "")}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {step.description}
              </p>
            </li>

            {index < steps.length - 1 && (
              <span
                className="absolute -bottom-3 left-1/2 z-10 grid size-6 -translate-x-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm sm:hidden lg:top-1/2 lg:-right-3 lg:bottom-auto lg:left-auto lg:translate-x-0 lg:-translate-y-1/2 dark:border-white/10 dark:bg-slate-900 dark:text-slate-500 dark:shadow-none"
                aria-hidden="true"
              >
                <ArrowDown className="size-3.5 lg:hidden" />
                <ArrowRight className="hidden size-3.5 lg:block" />
              </span>
            )}
          </Reveal>
        );
      })}
    </ol>
  );
}
