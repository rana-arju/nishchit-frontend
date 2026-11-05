import type { Metadata } from "next";
import { FaqSection } from "@/features/marketing/components/faq-section";
import { FinalCta } from "@/features/marketing/components/final-cta";
import { Footer } from "@/features/marketing/components/footer";
import { Navbar } from "@/features/marketing/components/navbar";
import { marketingContent } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: `${marketingContent.faq.title} — ${marketingContent.brand}`,
  description: marketingContent.faq.title,
};

export default function FaqPage() {
  return (
    <div className="font-bangla min-h-screen overflow-hidden">
      <Navbar />
      <main>
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
