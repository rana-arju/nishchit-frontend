import { ArrowRight, Check, MessageCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { marketingContent } from "@/features/marketing/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function HeroSection() {
  const { hero } = marketingContent;

  return (
    <section className="relative border-b py-16 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <p className="text-primary mb-4 text-sm font-semibold">{hero.eyebrow}</p>
          <h1 className="max-w-3xl text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-gradient-brand text-primary-foreground h-11 px-5 hover:opacity-90",
              )}
            >
              {hero.primaryAction}
              <ArrowRight />
            </Link>
            <Link
              href="#how-it-works"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}
            >
              {hero.secondaryAction}
            </Link>
          </div>
        </Reveal>
        <Reveal className="lg:pl-8">
          <div className="bg-muted/60 shadow-primary/5 rounded-3xl border p-3 shadow-xl sm:p-5">
            <div className="bg-card rounded-2xl border p-5">
              <div className="mb-5 flex items-center gap-3 border-b pb-4">
                <span className="bg-accent text-accent-foreground grid size-9 place-items-center rounded-full">
                  <MessageCircle className="size-4" aria-hidden="true" />
                </span>
                <p className="font-medium">{hero.mock.label}</p>
              </div>
              <div className="bg-secondary ml-auto max-w-xs rounded-2xl rounded-br-sm p-4 text-sm leading-6">
                {hero.mock.customer}
              </div>
              <div className="mt-5 rounded-2xl border p-4">
                <div className="mb-4 flex items-center gap-2 font-medium">
                  <span className="bg-gradient-brand text-primary-foreground grid size-6 place-items-center rounded-full">
                    <Check className="size-3.5" />
                  </span>
                  {hero.mock.status}
                </div>
                <dl className="grid gap-3 text-sm">
                  {[
                    [hero.mock.productLabel, hero.mock.product],
                    [hero.mock.locationLabel, hero.mock.location],
                    [hero.mock.phoneLabel, hero.mock.phone],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[5rem_1fr] gap-3">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
