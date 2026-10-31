import { ArrowRight } from "lucide-react";
import { marketingContent } from "@/features/marketing/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function HowItWorksSection() {
  const { howItWorks } = marketingContent;

  return (
    <section id="how-it-works" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={howItWorks.eyebrow} title={howItWorks.title} />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, index) => (
            <Reveal key={step.title}>
              <div className="relative h-full rounded-2xl border p-5 transition-transform hover:-translate-y-1 motion-reduce:transform-none">
                <div className="bg-accent text-accent-foreground mb-5 grid size-9 place-items-center rounded-full font-semibold">
                  {index + 1}
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">{step.description}</p>
                {index < howItWorks.steps.length - 1 && (
                  <ArrowRight
                    className="text-muted-foreground absolute top-6 -right-4 hidden size-4 lg:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
