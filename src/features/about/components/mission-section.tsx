import { MessageSquareText, ShieldCheck, Truck } from "lucide-react";
import { marketingContent } from "@/features/marketing/content";
import { Reveal } from "@/features/marketing/components/reveal";

const valueIcons = {
  inbox: MessageSquareText,
  risk: ShieldCheck,
  courier: Truck,
} as const;

const valueThemes = {
  inbox: "text-purple-600 bg-purple-50 border-purple-200/60 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/60",
  risk: "text-blue-600 bg-blue-50 border-blue-200/60 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/60",
  courier: "text-emerald-600 bg-emerald-50 border-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60",
} as const;

export function MissionSection() {
  const { about } = marketingContent;

  return (
    <section className="bg-white py-16 transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
            {about.mission.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl leading-tight font-bold tracking-[-0.03em] text-balance text-slate-950 sm:text-3xl lg:text-4xl dark:text-white">
            {about.mission.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
            {about.mission.description}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-5">
          {about.values.map((value) => {
            const Icon = valueIcons[value.key as keyof typeof valueIcons];
            const theme = valueThemes[value.key as keyof typeof valueThemes];

            return (
              <Reveal key={value.title} className="h-full">
                <article className="group h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 dark:border-slate-800 dark:bg-slate-900/60">
                  <div
                    className={`inline-flex size-12 items-center justify-center rounded-2xl border shadow-sm transition-transform duration-300 group-hover:scale-110 ${theme}`}
                  >
                    <Icon className="size-5.5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {value.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
