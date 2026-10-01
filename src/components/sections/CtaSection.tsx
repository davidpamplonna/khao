"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef } from "react";

import { KHAO_ASSETS } from "@/src/config/khao-assets";

import { gsap } from "@/src/lib/gsap";
import { useScrollReveal } from "@/src/motion/use-scroll-reveal";
import { useReducedMotion } from "@/src/motion/use-reduced-motion";

import { ReservationButton } from "../ui/Form";
import { Title } from "../ui/title";

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const revealConfigs = useMemo(
    () => [
      {
        selector: ".cta-title h2",
        trigger: () => sectionRef.current,
        start: "top 75%",
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      },
      {
        selector: ".cta-description",
        trigger: () => sectionRef.current,
        start: "top 75%",
        from: { opacity: 0, y: 25 },
        to: {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        stagger: 0.12,
      },
      {
        selector: ".cta-button",
        trigger: () => sectionRef.current,
        start: "top 75%",
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      },
    ],
    [],
  );

  useScrollReveal(sectionRef, revealConfigs);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      const imageWrapper = section.querySelector(".cta-image-wrapper");

      if (!imageWrapper) return;

      gsap.set(imageWrapper, {
        opacity: 0,
        scale: 1.08,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        })
        .to(imageWrapper, {
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
        });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="khao-cta-title"
      className="
        relative
        overflow-hidden
        bg-khao-bg
        px-4
        pb-16
        pt-8
        sm:px-6
        sm:pb-24
        sm:pt-10
        md:px-10
        md:pb-32
        md:pt-12
        lg:px-12
      "
    >
      {/* Image + overlays */}
      <div
        className="
          relative
          mx-auto
          w-full
          max-w-350
          overflow-hidden
        "
      >
        <div
          className="
            cta-image-wrapper
            relative
            aspect-4/4
            w-full
            overflow-hidden
            sm:aspect-16/10
            lg:aspect-video
          "
        >
          <Image
            src={KHAO_ASSETS.cta.cta_aerial}
            alt="Prato da cozinha tailandesa contemporânea do KHAO"
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="
              cta-image
              object-cover
              object-center
              grayscale-[0.08]
              contrast-[1.08]
            "
          />

          {/* Overlay superior */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              z-10
              h-[22%]
              min-h-32
              bg-linear-to-b
              from-khao-black
              via-khao-dark/70
              to-transparent
            "
          />

          {/* Overlay inferior */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              z-10
              h-[38%]
              min-h-48
              bg-linear-to-t
              from-khao-black
              via-khao-dark/80
              to-transparent
            "
          />

          {/* Overlay lateral esquerdo */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-0
              z-10
              w-[20%]
              bg-linear-to-r
              from-khao-black
              via-khao-dark/70
              to-transparent
            "
          />

          {/* Overlay lateral direito */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-y-0
              right-0
              z-10
              w-[20%]
              bg-linear-to-l
              from-khao-black
              via-khao-dark/70
              to-transparent
            "
          />
        </div>
      </div>

      {/* Content */}
      <div
        id="reserva"
        className="
          relative
          z-20
          mx-auto
          -mt-8
          w-full
          max-w-350
          sm:-mt-12
          md:-mt-16
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-4xl
            flex-col
            items-center
            text-center
          "
        >
          {/* Title */}
          <div className="cta-title">
            <Title
              title={
                <>
                  Venha sentir o {""}
                  <span className="text-khao-gold">KHAO</span>
                </>
              }
              className="text-[clamp(2rem,5vw,4rem)]"
            />
          </div>

          {/* Description */}
          <div className="mt-5 max-w-xl sm:mt-6">
            <p className="cta-description khao-description">
              Uma cozinha que não pede tradução.
            </p>

            <p className="cta-description khao-description mt-1">
              Uma experiência que começa antes do primeiro sabor.
            </p>
          </div>

          {/* Button */}
          <div className="cta-button mt-8 sm:mt-10">
            <ReservationButton variant="primary">
              Reserve sua mesa
            </ReservationButton>
          </div>
        </div>
      </div>
    </section>
  );
}
