import type { Metadata } from "next";
import { AboutHero } from "@/features/about/components/about-hero";
import { AboutStats } from "@/features/about/components/about-stats";
import { MissionSection } from "@/features/about/components/mission-section";
import { FinalCta } from "@/features/marketing/components/final-cta";
import { Footer } from "@/features/marketing/components/footer";
import { Navbar } from "@/features/marketing/components/navbar";
import { marketingContent } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: `${marketingContent.about.title} — ${marketingContent.brand}`,
  description: marketingContent.about.description,
};

export default function AboutPage() {
  return (
    <div className="font-bangla min-h-screen overflow-hidden">
      <Navbar />
      <main>
        <AboutHero />
        <MissionSection />
        <AboutStats />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
