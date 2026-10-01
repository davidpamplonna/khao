"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

import { KHAO_ASSETS, KHAO_VIDEOS } from "@/src/config/khao-assets";
import { gsap } from "@/src/lib/gsap";
import { useReducedMotion } from "@/src/motion/use-reduced-motion";

import { Button } from "../ui/button";
import { ReservationButton } from "../ui/Form";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const context = gsap.context(() => {
      const introElements = [
        eyebrowRef.current,
        titleRef.current,
        subtitleRef.current,
        descriptionRef.current,
        actionsRef.current,
        scrollRef.current,
      ].filter(Boolean);

      // REDUCED MOTION

      if (reducedMotion) {
        gsap.set(introElements, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
        });

        gsap.set(overlayRef.current, {
          autoAlpha: 1,
        });

        gsap.set(videoRef.current, {
          scale: 1,
          yPercent: 0,
        });

        return;
      }

      // INITIAL STATE

      gsap.set(introElements, {
        autoAlpha: 0,
        y: 30,
      });

      gsap.set(titleRef.current, {
        autoAlpha: 0,
        y: 50,
        scale: 0.94,
      });

      gsap.set(videoRef.current, {
        scale: 1.08,
      });

      gsap.set(overlayRef.current, {
        autoAlpha: 0,
      });

      // HERO INTRO

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .to(overlayRef.current, {
          autoAlpha: 1,
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
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
          },
          0.5,
        )
        .to(
          titleRef.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
          },
          0.65,
        )
        .to(
          subtitleRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
          },
          1.15,
        )
        .to(
          descriptionRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
          },
          1.4,
        )
        .to(
          actionsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
          },
          1.65,
        )
        .to(
          scrollRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
          },
          2,
        );

      // SCROLL PARALLAX

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      scrollTimeline
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
            autoAlpha: 0,
          },
          0,
        )
        .to(
          overlayRef.current,
          {
            autoAlpha: 0.8,
          },
          0,
        )
        .to(
          scrollRef.current,
          {
            autoAlpha: 0,
          },
          0,
        );
    }, hero);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={heroRef}
      aria-labelledby="khao-hero-title"
      className="
        relative
        flex
        min-h-svh
        w-full
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* HERO VIDEO */}

      <video
        ref={videoRef}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          will-change-transform
        "
        autoPlay={!reducedMotion}
        loop
        muted
        playsInline
        preload="metadata"
        poster={KHAO_ASSETS.hero.poster_chef}
        aria-hidden="true"
      >
        <source src={KHAO_VIDEOS.hero} type="video/mp4" />
      </video>

      {/* OVERLAY */}

      <div
        ref={overlayRef}
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-khao-black/55
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          flex
          w-full
          max-w-350
          flex-col
          items-center
          gap-8
          px-6
          text-center
          md:px-10
        "
      >
        {/* BRAND */}

        <div className="flex flex-col gap-4">
          <div
            ref={eyebrowRef}
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div
              aria-hidden="true"
              className="
                h-px
                w-14
                flex-1
                bg-khao-white/40
              "
            />

            <p
              className="
                mb-0
                text-[9px]
                uppercase
                tracking-[0.6em]
                text-khao-white
                md:text-[15px]
              "
            >
              Cozinha
            </p>
          </div>

          <h1 id="khao-hero-title" ref={titleRef}>
            <Image
              src={KHAO_ASSETS.hero.light}
              alt="KHAO"
              width={600}
              height={600}
              priority
              quality={90}
              sizes="
                (max-width: 640px) 180px,
                (max-width: 1024px) 440px,
                500px
              "
              className="h-auto w-70 md:w-60 lg:w-150"
            />
          </h1>

          <div
            ref={subtitleRef}
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <p
              className="
                mb-0
                text-[9px]
                uppercase
                tracking-[0.6em]
                text-khao-white
                md:text-[15px]
              "
            >
              Tailandesa
            </p>

            <div
              aria-hidden="true"
              className="
                h-px
                w-14
                flex-1
                bg-khao-white/40
              "
            />
          </div>
        </div>

        {/* DESCRIPTION */}

        <p
          ref={descriptionRef}
          className="
            khao-description
            max-w-lg
            text-[14px]
            text-khao-white/95
            md:text-[16px]
          "
        >
          Sabores intensos, técnicas ancestrais e uma interpretação
          contemporânea da cozinha tailandesa.
        </p>

        {/* ACTIONS */}

        <div
          ref={actionsRef}
          className="
            flex
            w-75
            flex-col
            items-stretch
            gap-3
            sm:w-auto
            sm:flex-row
            sm:items-center
          "
        >
          <Button type="button" variant="primary" href="#cardapio">
            Explorar o menu
          </Button>

          <ReservationButton variant="secondary">
            Reserve uma mesa
          </ReservationButton>
        </div>
      </div>

      {/* SCROLL INDICATOR */}

      <div
        ref={scrollRef}
        className="
          absolute
          bottom-17
          left-1/2
          z-10
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-3
        "
        aria-hidden="true"
      >
        <span
          className="
            text-[7px]
            uppercase
            tracking-[0.45em]
            text-khao-white/50
          "
        >
          Scroll
        </span>

        <ArrowDown
          size={14}
          strokeWidth={1}
          className="text-khao-white/70 animate-bounce"
        />
      </div>
    </section>
  );
}
