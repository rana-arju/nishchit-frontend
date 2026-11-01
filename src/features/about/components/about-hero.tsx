import { marketingContent } from "@/features/marketing/content";
import { Reveal } from "@/features/marketing/components/reveal";

export function AboutHero() {
  const { about } = marketingContent;

  return (
    <section className="relative isolate overflow-hidden bg-slate-50 py-16 transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-slate-950">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-violet-200/35 blur-3xl dark:bg-violet-800/10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-violet-700 uppercase dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
            <span className="size-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
            {about.eyebrow}
          </div>
          <h1 className="mt-5 text-3xl leading-[1.2] font-bold tracking-[-0.035em] text-balance text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            {about.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
            {about.description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
