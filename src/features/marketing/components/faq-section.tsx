import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { marketingContent } from "@/features/marketing/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function FaqSection() {
  const { faq } = marketingContent;

  return (
    <section id="faq" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />
        </Reveal>
        <Reveal>
          <Accordion className="rounded-2xl border px-5">
            {faq.items.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
