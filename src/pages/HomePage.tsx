import { site } from "../data/site.ts";
import { faqNodes, graph, organizationNodes } from "../lib/schema.ts";
import { Seo } from "../components/seo/Seo.tsx";
import { BenefitsSection } from "../sections/BenefitsSection.tsx";
import { CtaSection } from "../sections/CtaSection.tsx";
import { FaqSection } from "../sections/FaqSection.tsx";
import { HeroSection } from "../sections/HeroSection.tsx";
import { HowItWorksSection } from "../sections/HowItWorksSection.tsx";
import { PricingSection } from "../sections/PricingSection.tsx";
import { TemplatesSection } from "../sections/TemplatesSection.tsx";
import { WhySection } from "../sections/WhySection.tsx";

export function HomePage() {
  return (
    <>
      <Seo
        title="Bina Website Profesional dengan AI"
        description={site.description}
        path="/"
        jsonLd={graph([...organizationNodes("/"), ...faqNodes("/")])}
      />
      <HeroSection />
      <BenefitsSection />
      <PricingSection />
      <TemplatesSection />
      <HowItWorksSection />
      <WhySection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
