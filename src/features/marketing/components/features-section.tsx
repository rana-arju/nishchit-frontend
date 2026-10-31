import {
  Handshake,
  Languages,
  LayoutDashboard,
  LockKeyhole,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { marketingContent } from "@/features/marketing/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const icons = {
  language: Languages,
  risk: ShieldCheck,
  courier: Truck,
  handoff: Handshake,
  dashboard: LayoutDashboard,
  security: LockKeyhole,
};

export function FeaturesSection() {
  const { features } = marketingContent;

  return (
    <section id="features" className="bg-muted/30 scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={features.eyebrow} title={features.title} />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((item) => {
            const Icon = icons[item.key];
            return (
              <Reveal key={item.title}>
                <article className="bg-card h-full rounded-2xl border p-5 transition-transform hover:-translate-y-1 motion-reduce:transform-none">
                  <span className="bg-accent text-accent-foreground mb-5 grid size-10 place-items-center rounded-xl">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
