import { Header } from "../components/layout/header";
import { Hero } from "../components/sections/hero";
import { IntroSection } from "../components/sections/IntroSection";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <IntroSection />
    </main>
  );
}
