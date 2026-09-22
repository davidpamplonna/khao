"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { KHAO_CTA } from "@/src/data/assets/image";

import { gsap } from "@/src/lib/gsap";

import { Button } from "../ui/button";
import { Title } from "../ui/title";

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const imageWrapper = section.querySelector(".cta-image-wrapper");
      const title = section.querySelector(".cta-title");
      const descriptions = section.querySelectorAll(".cta-description");
      const button = section.querySelector(".cta-button");

      if (!imageWrapper || !title || !button) return;

      // Estado inicial
      gsap.set(imageWrapper, {
        opacity: 0,
        scale: 1.08,
      });

      gsap.set(title, {
        opacity: 0,
        y: 40,
      });

      gsap.set(descriptions, {
        opacity: 0,
        y: 25,
      });

      gsap.set(button, {
        opacity: 0,
        y: 20,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Imagem + overlays entram juntos
      tl.to(imageWrapper, {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: "power3.out",
      })

        // Título
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.9",
        )

        // Descrições
        .to(
          descriptions,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.55",
        )

        // Botão
        .to(
          button,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        );
    }, section);

    return () => ctx.revert();
  }, []);

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
            src={KHAO_CTA.cta}
            alt="Prato da cozinha tailandesa contemporânea do KHAO"
            fill
            sizes="100vw"
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
              from-[#0a0a09]
              via-[#0a0a09]/70
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
              from-[#0a0a09]
              via-[#0a0a09]/80
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
              from-[#0a0a09]
              via-[#0a0a09]/70
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
              from-[#0a0a09]
              via-[#0a0a09]/70
              to-transparent
            "
          />
        </div>
      </div>

      {/* Content */}
      <div
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
              id="khao-cta-title"
              title={
                <>
                  Venha sentir o <span className="text-khao-gold">KHAO</span>.
                </>
              }
              titleClassName="
                text-[clamp(2.25rem,6vw,5rem)]
              "
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
            <Button variant="secondary" href="#reserva">
              Reserve sua mesa
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
