import type { Metadata } from "next";
import { ContactHero } from "@/features/contact/components/contact-hero";
import { ContactSection } from "@/features/contact/components/contact-section";
import { Footer } from "@/features/marketing/components/footer";
import { Navbar } from "@/features/marketing/components/navbar";
import { marketingContent } from "@/features/marketing/content";

export const metadata: Metadata = {
  title: `${marketingContent.contact.title} — ${marketingContent.brand}`,
  description: marketingContent.contact.description,
};

export default function ContactPage() {
  return (
    <div className="font-bangla min-h-screen overflow-hidden">
      <Navbar />
      <main>
        <ContactHero />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
