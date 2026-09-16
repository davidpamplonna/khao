import { Header } from "../components/layout/header";
import { Hero } from "../components/sections/hero";
import { EssenceSection } from "../components/sections/EssenceSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-khao-bg">
      <Header />
      <Hero/>
      <EssenceSection/>
      <ExperienceSection />
    </main>
  );
}

