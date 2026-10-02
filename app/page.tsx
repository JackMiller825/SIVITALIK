import { AboutSection } from "@/components/about-section";
import { BuySection } from "@/components/buy-section";
import { Hero } from "@/components/hero";
import { RoadmapSection } from "@/components/roadmap-section";
import { SectionRule } from "@/components/section-rule";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TokenSection } from "@/components/token-section";
import { TradeSection } from "@/components/trade-section";
import { VenuesSection } from "@/components/venues-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="content">
        <Hero />
        <VenuesSection />
        <SectionRule />
        <AboutSection />
        <SectionRule />
        <BuySection />
        <SectionRule />
        <TradeSection />
        <SectionRule />
        <TokenSection />
        <SectionRule />
        <RoadmapSection />
      </main>
      <SiteFooter />
    </>
  );
}
