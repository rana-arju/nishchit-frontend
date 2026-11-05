import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { marketingContent } from "@/features/marketing/content";
import { Reveal } from "./reveal";

export function FaqSection() {
  const { faq } = marketingContent;

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-slate-50 py-16 transition-colors duration-300 sm:py-24 lg:py-28 dark:bg-slate-950"
    >
      <div
        className="pointer-events-none absolute top-20 right-1/4 -z-10 h-72 w-72 rounded-full bg-violet-200/35 blur-3xl dark:bg-violet-800/10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-violet-700 uppercase dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
                <span className="size-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
                {faq.eyebrow}
              </div>
              <h2 className="mt-5 max-w-sm text-3xl leading-[1.2] font-bold tracking-[-0.035em] text-balance text-slate-950 sm:text-4xl dark:text-white">
                {faq.title}
              </h2>
              <p className="mt-4 max-w-sm text-base leading-7 text-slate-600 dark:text-slate-300">
                Nishchit সম্পর্কে সেলারদের সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নের উত্তর।
              </p>

              <Link
                href="/contact"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 dark:text-violet-300"
              >
                <MessageCircleQuestion className="size-4" aria-hidden="true" />
                আরও প্রশ্ন আছে? যোগাযোগ করুন
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 shadow-sm sm:px-7 dark:border-slate-800 dark:bg-slate-900/70">
              <Accordion>
                {faq.items.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={item.question}
                    className="border-slate-200 dark:border-slate-800"
                  >
                    <AccordionTrigger className="hover:text-primary gap-5 py-5 text-base text-slate-950 dark:text-white">
                      <span className="flex items-start gap-4">
                        <span className="font-mono text-sm font-semibold text-slate-300 dark:text-slate-600">
                          0{index + 1}
                        </span>
                        <span>{item.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-9 text-slate-600 dark:text-slate-400">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
