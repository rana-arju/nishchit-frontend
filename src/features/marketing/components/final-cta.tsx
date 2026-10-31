import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { marketingContent } from "@/features/marketing/content";
import { Reveal } from "./reveal";

export function FinalCta() {
  const { finalCta } = marketingContent;

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14">
      <Reveal className="bg-gradient-brand text-primary-foreground mx-auto max-w-7xl rounded-3xl px-6 py-12 text-center sm:px-10">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{finalCta.title}</h2>
        <p className="mx-auto mt-4 max-w-xl opacity-85">{finalCta.description}</p>
        <Link
          href="/dashboard"
          className="focus-visible:ring-ring bg-background text-foreground mt-7 inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-medium transition-transform outline-none hover:-translate-y-0.5 focus-visible:ring-2 motion-reduce:transform-none"
        >
          {finalCta.action}
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </section>
  );
}
