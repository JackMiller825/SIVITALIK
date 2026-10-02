import { BuySection } from "@/components/buy-section";
import { CommunitySection } from "@/components/community-section";
import { ExperienceSection } from "@/components/experience-section";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TokenSection } from "@/components/token-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="content">
        <Hero />
        <ExperienceSection />
        <TokenSection />
        <BuySection />
        <CommunitySection />
      </main>
      <SiteFooter />
    </>
  );
}
