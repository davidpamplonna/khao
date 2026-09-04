"use client";

import { HERO_VIDEO, HERO_IMG } from "@/src/types/images";
import Image from "next/image";
import { Button } from "@/src/components/ui/buttom";
import { ArrowDown } from "lucide-react";

import { gsap } from "@/src/lib/gsap";
import { useEffect, useRef } from "react";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set(
        [
          overlayRef.current,
          ...[
            eyebrowRef.current,
            titleRef.current,
            subtitleRef.current,
            descriptionRef.current,
            actionsRef.current,
            scrollRef.current,
          ],
        ],
        { opacity: 1, y: 0, scale: 1 },
      );
      return;
    }

    const elements = [
      eyebrowRef.current,
      titleRef.current,
      subtitleRef.current,
      descriptionRef.current,
      actionsRef.current,
      scrollRef.current,
    ];

    const ctx = gsap.context(() => {
      gsap.set(elements, {
        opacity: 0,
        y: 30,
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.94,
      });

      gsap.set(videoRef.current, {
        scale: 1.08,
      });

      gsap.set(overlayRef.current, {
        opacity: 0,
      });

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .to(overlayRef.current, {
          opacity: 1,
          duration: 1.5,
        })
        .to(
          videoRef.current,
          {
            scale: 1,
            duration: 2.5,
            ease: "power2.out",
          },
          0,
        )
        .to(
          eyebrowRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          0.5,
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
          },
          0.65,
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          1.15,
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          1.4,
        )
        .to(
          actionsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          1.65,
        )
        .to(
          scrollRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          2,
        );

      // Hero reage ao scroll
      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(
          videoRef.current,
          {
            scale: 1.12,
            yPercent: 8,
          },
          0,
        )
        .to(
          titleRef.current,
          {
            yPercent: -25,
            scale: 0.92,
          },
          0,
        )
        .to(
          subtitleRef.current,
          {
            yPercent: -40,
          },
          0,
        )
        .to(
          [descriptionRef.current, actionsRef.current],
          {
            yPercent: -20,
            opacity: 0,
          },
          0,
        )
        .to(
          overlayRef.current,
          {
            opacity: 0.8,
          },
          0,
        )
        .to(
          scrollRef.current,
          {
            opacity: 0,
          },
          0,
        );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* video */}
      <video
        ref={videoRef}
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
      <div ref={overlayRef} className="absolute inset-0 bg-khao-black/55" />

      {/* bottom gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,9,0.25),rgba(10,10,9,0.05)_45%,rgba(10,10,9,0.9))]" />

      {/* content */}
      <div className="relative z-10 flex w-full max-w-350 flex-col items-center px-6 text-center md:px-10 gap-4">
        <div className="flex flex-col gap-4">
          <div
            ref={eyebrowRef}
            className="flex items-center justify-between gap-4"
          >
            <div className="h-px w-14 flex-1 bg-khao-white/40" />
            <p className="mb-0 text-[9px] uppercase tracking-[0.6em] text-khao-white/80 md:text-[15px]">
              Cozinha
            </p>
          </div>
          {/* titulo */}
          <h1 ref={titleRef}>
            <Image
              src={HERO_IMG.khao_title}
              alt="Nome KHAO"
              width={600}
              height={600}
              className="khao-conteiner w-[clamp(300px,40vw,900px)] max-w-full object-contain"
            />
          </h1>
          <div
            ref={subtitleRef}
            className="flex items-center justify-between gap-4"
          >
            <p className="mb-0 text-[9px] uppercase tracking-[0.6em] text-khao-white/80 md:text-[15px]">
              Tailandesa
            </p>
            <div className="h-px w-14 flex-1 bg-khao-white/40" />
          </div>
        </div>

        {/* descrição */}
        <p
          ref={descriptionRef}
          className="khao-description max-w-lg text-[14px] md:text-[16px] text-khao-white/70"
        >
          Sabores intensos, técnicas ancestrais e uma interpretação
          contemporânea da cozinha tailandesa.
        </p>

        {/* botoes */}
        <div
          ref={actionsRef}
          className="flex w-75 flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <Button type="button" variant="default" href="#cardapio">
            Explorar o menu
          </Button>
          <Button type="button" variant="primary" href="#cardapio">
            Reserve uma mesa
          </Button>
        </div>
      </div>
      {/* arrow */}
      <div
        ref={scrollRef}
        className="absolute bottom-7 left-1/2 z-10  flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[7px] uppercase tracking-[0.45em] text-khao-white/50">
          Scroll
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
