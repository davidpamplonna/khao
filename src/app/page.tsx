import { Header } from "../components/layout/header";
import { Hero } from "../components/sections/Hero";
import { EssenceSection } from "../components/sections/EssenceSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-khao-bg">
      <Header />
      <Hero/>
      <EssenceSection/>
    </main>
  );
}

