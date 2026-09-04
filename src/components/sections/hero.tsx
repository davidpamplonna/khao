"use client";

import { HERO_VIDEO, HERO_IMG } from "@/src/types/images";
import Image from "next/image";
import { Button } from "../ui/buttom";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={HERO_IMG.khao_poster}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* overlay */}
      <div className="absolute inset-0 bg-khao-black/55" />

      {/* bottom gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,9,0.25),rgba(10,10,9,0.05)_45%,rgba(10,10,9,0.9))]" />

      {/* content */}
      <div className="relative z-10 flex w-full max-w-350 flex-col items-center px-6 text-center md:px-10 gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="h-px w-14 flex-1 bg-khao-white/40" />
            <p className="mb-0 text-[9px] uppercase tracking-[0.6em] text-khao-white/80 md:text-[15px]">
              Cozinha
            </p>
          </div>
          {/* titulo */}
          <h1>
            <Image
              src={HERO_IMG.khao_title}
              alt="Nome KHAO"
              width={600}
              height={600}
              className="khao-conteiner w-[clamp(300px,40vw,900px)] max-w-full object-contain"
            />
          </h1>
          <div className="flex items-center justify-between gap-4">
            <p className="mb-0 text-[9px] uppercase tracking-[0.6em] text-khao-white/80 md:text-[15px]">
              Tailandesa
            </p>
            <div className="h-px w-14 flex-1 bg-khao-white/40" />
          </div>
        </div>

        {/* descrição */}
        <p className="khao-description max-w-lg text-[14px] md:text-[16px]">
          Sabores intensos, técnicas ancestrais e uma interpretação
          contemporânea da cozinha tailandesa.
        </p>

        {/* botoes */}
        <div className="flex gap-3 items-center">
          <Button
            type="button"
            variant="default"
            href="#cardapio"
           
          >
            Explorar o menu
          </Button>
          <Button
            type="button"
            variant="primary"
            href="#cardapio"
            
          >
            Reserve uma mesa
          </Button>
        </div>
      </div>
    </section>
  );
}
