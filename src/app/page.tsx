import { Header } from "../components/layout/header";
import { Hero } from "../components/sections/hero";
import { EssenceSection } from "../components/sections/EssenceSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { MenuSection } from "../components/sections/MenuSection";
import { CombosSection } from "../components/sections/CombosSection";
import { CtaSection } from "../components/sections/CtaSection";
import { GallerySection } from "../components/ui/GallerySection";
import { Footer } from "../components/layout/footer";
import { siteUrl } from "@/src/lib/site";

const restaurantStructuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Restobar KHAO",
  url: siteUrl,
  logo: `${siteUrl}/assets/brand/khao-logo.webp`,
  image: `${siteUrl}/assets/cta/cta-khao-aerial.opt.webp`,
  description:
    "A essência da Tailândia, transformada em uma experiência contemporânea.",
  servesCuisine: "Cozinha tailandesa contemporânea",
  sameAs: [
    "https://www.instagram.com/restobarkhao/",
    "https://www.facebook.com/restobarkhao",
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-khao-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantStructuredData),
        }}
      />
      <Header />
      <Hero />
      <EssenceSection />
      <ExperienceSection />
      <MenuSection />
      <CombosSection />
      <CtaSection />
      <GallerySection />
      <Footer />
    </main>
  );
}
