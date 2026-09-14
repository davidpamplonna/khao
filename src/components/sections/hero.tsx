import { KHAO_VIDEO } from "@/src/data/video";
import { KHAO_HERO } from "@/src/data/image";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* video hero */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={KHAO_HERO.hero_khao_chef}
      >
        <source src={KHAO_VIDEO} type="video/mp4" />
      </video>
      {/* overlay */}
      <div className=" absolute inset-0 bg-khao-black/55" />
      {/* bottom gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,9,0.25),rgba(10,10,9,0.05)_45%,rgba(10,10,9,0.9))]" />

      {/* content */}
      <div className="relative z-10 flex w-full max-w-350 flex-col items-center px-6 text-center md:px-10 gap-8">
        {/* nome khao */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="h-px w-14 flex-1 bg-khao-white/40" />
            <p className="mb-0 text-[9px] md:text-[15px] uppercase tracking-[0.6em] text-khao-white">
              Cozinha
            </p>
          </div>
          <h1>
            <Image
              src={KHAO_HERO.khao_light}
              alt="Nome KHAO"
              width={600}
              height={600}
            />
          </h1>
          <div className="flex items-center justify-between gap-4">
            <p className="mb-0 text-[9px] md:text-[15px] uppercase tracking-[0.6em] text-khao-white">
              Tailandesa
            </p>
            <div className="h-px w-14 flex-1 bg-khao-white/40" />
          </div>
        </div>
        {/* description */}
        <p className="khao-description max-w-lg text-[14px] md:text-[16px] text-khao-white/95">
          Sabores intensos, técnicas ancestrais e uma interpretação
          contemporânea da cozinha tailandesa.
        </p>

        {/* actions buttom */}
        <div className="flex w-75 flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Button type="button" variant="primary" href="#cardapio">
            Explorar o menu
          </Button>
          <Button type="button" variant="secondary" href="#cardapio">
            Reserve uma mesa
          </Button>
        </div>
      </div>
      {/* arrow */}
      <div className="absolute bottom-17 left-1/2 z-10 flex translate-x/1/2 flex-col items-center gap-3">
        <span className="text-[7px] uppercase tracking-[0.45em] text-khao-white/50">
          scroll
        </span>
        <ArrowDown
          size={14}
          strokeWidth={1}
          className="animate-bounce text-khao-white/70"
        />
      </div>
    </section>
  );
}
