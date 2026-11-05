import type { Metadata } from "next";
import { FeaturesSection } from "@/features/marketing/components/features-section";
import { FinalCta } from "@/features/marketing/components/final-cta";
import { Footer } from "@/features/marketing/components/footer";
import { Navbar } from "@/features/marketing/components/navbar";
import { marketingContent } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: `${marketingContent.features.title} — ${marketingContent.brand}`,
  description: marketingContent.features.title,
};

export default function FeaturesPage() {
  return (
    <div className="font-bangla min-h-screen overflow-hidden">
      <Navbar />
      <main>
        <FeaturesSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
