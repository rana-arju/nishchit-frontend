import { marketingContent } from "@/features/marketing/content";
import { Reveal } from "@/features/marketing/components/reveal";

export function AboutStats() {
  const { stats } = marketingContent.howItWorks.showcase;

  return (
    <section className="bg-slate-50 py-16 transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-xl shadow-slate-200/60 backdrop-blur-md lg:grid-cols-4 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-2xl dark:shadow-black/20">
            {stats.map((stat) => (
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
