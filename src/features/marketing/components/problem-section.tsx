import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { marketingContent } from "@/features/marketing/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function ProblemSection() {
  const { problem } = marketingContent;

  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={problem.eyebrow}
            title={problem.title}
            description={problem.description}
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {problem.items.map((item) => (
            <Reveal key={item.title}>
              <Card className="h-full transition-transform hover:-translate-y-1 motion-reduce:transform-none">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-7">{item.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
