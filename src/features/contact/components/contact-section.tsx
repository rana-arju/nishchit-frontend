import { ArrowRight, MessageCircle, Sparkles, Zap } from "lucide-react";
import { marketingContent } from "@/features/marketing/content";
import { AnchorLink } from "@/features/marketing/components/anchor-link";
import { Reveal } from "@/features/marketing/components/reveal";
import { ContactForm } from "./contact-form";

const infoIcons = [Zap, Sparkles, MessageCircle] as const;

export function ContactSection() {
  const { contact } = marketingContent;

  return (
    <section className="bg-white py-16 transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            {contact.info.map((item, index) => {
              const Icon = infoIcons[index] ?? Zap;
              const content = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-200 dark:shadow-violet-950/50">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-slate-950 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </>
              );

              const className =
                "group flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition duration-300 dark:border-slate-800 dark:bg-slate-900/60";

              return "href" in item && item.href ? (
                <AnchorLink
                  key={item.title}
                  href={item.href}
                  className={`${className} hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/70 dark:hover:border-violet-500/40`}
                >
                  {content}
                  <ArrowRight className="ml-auto size-4 shrink-0 self-center text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-violet-500 dark:text-slate-600" />
                </AnchorLink>
              ) : (
                <div key={item.title} className={className}>
                  {content}
                </div>
              );
            })}
          </Reveal>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
