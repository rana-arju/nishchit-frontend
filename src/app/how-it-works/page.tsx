import type { Metadata } from "next";
import { FinalCta } from "@/features/marketing/components/final-cta";
import { Footer } from "@/features/marketing/components/footer";
import { HowItWorksSection } from "@/features/marketing/components/how-it-works-section";
import { Navbar } from "@/features/marketing/components/navbar";
import { marketingContent } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: `${marketingContent.howItWorks.title} — ${marketingContent.brand}`,
  description: marketingContent.howItWorks.title,
};

export default function HowItWorksPage() {
  return (
    <div className="font-bangla min-h-screen overflow-hidden">
      <Navbar />
      <main>
        <HowItWorksSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
