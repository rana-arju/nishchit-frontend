import { FaqSection } from "@/features/marketing/components/faq-section";
import { FeaturesSection } from "@/features/marketing/components/features-section";
import { FinalCta } from "@/features/marketing/components/final-cta";
import { Footer } from "@/features/marketing/components/footer";
import { HeroSection } from "@/features/marketing/components/hero-section";
import { HowItWorksSection } from "@/features/marketing/components/how-it-works-section";
import { Navbar } from "@/features/marketing/components/navbar";
import { ProblemSection } from "@/features/marketing/components/problem-section";
import { ScrollToSection } from "@/features/marketing/components/scroll-to-section";

export default function RootPage() {
  return (
    <div className="font-bangla min-h-screen overflow-hidden">
      <ScrollToSection />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProblemSection />
        <HowItWorksSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
