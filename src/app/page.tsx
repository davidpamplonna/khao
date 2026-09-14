import { Header } from "../components/layout/header";
import { Hero } from "../components/sections/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-khao-bg">
      <Header />
      <Hero/>
    </main>
  );
}

