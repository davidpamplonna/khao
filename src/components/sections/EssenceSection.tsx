"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef } from "react";

import { KHAO_ASSETS } from "@/src/config/khao-assets";
import { gsap } from "@/src/lib/gsap";
import { useScrollReveal } from "@/src/motion/use-scroll-reveal";
import { useReducedMotion } from "@/src/motion/use-reduced-motion";
import { Title } from "../ui/title";

const STORY_IMAGES = [
  {
    src: KHAO_ASSETS.essence.restaurant_terrace,
    alt: "Terraço do KHAO com mesas, plantas e iluminação acolhedora",
  },
  {
    src: KHAO_ASSETS.essence.restaurant_interior,
    alt: "Interior do KHAO com mesas, plantas e iluminação acolhedora",
  },
  {
    src: KHAO_ASSETS.essence.chefPreparation,
    alt: "Chef selecionando ervas e ingredientes frescos na cozinha",
  },
  {
    src: KHAO_ASSETS.essence.wokFire,
    alt: "Chef salteando ingredientes no wok sobre as chamas",
  },
  {
    src: KHAO_ASSETS.essence.dishFinishing,
    alt: "Chef finalizando um prato tailandês com molho e ervas",
  },
  {
    src: KHAO_ASSETS.essence.cocktailPreparation,
    alt: "Bartender preparando um coquetel com ingredientes frescos",
  },
];

export function EssenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const revealConfigs = useMemo(
    () => [
      {
        selector: "[data-essence-title] h2",
        trigger: "[data-essence-title]",
        start: "top 78%",
        from: { autoAlpha: 0.15, y: 25 },
        to: { autoAlpha: 1, y: 0, ease: "none" },
      },
      {
        selector: "[data-essence-description]",
        trigger: "[data-essence-description-wrapper]",
        start: "top 82%",
        from: { autoAlpha: 0.15, y: 25 },
        to: { autoAlpha: 1, y: 0, ease: "none" },
        stagger: 0.15,
      },
    ],
    [],
  );

  useScrollReveal(sectionRef, revealConfigs);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || reducedMotion) return;

    const context = gsap.context(() => {
      //  IMAGEM DE FUNDO

      const backdrop = section.querySelector<HTMLElement>(
        "[data-essence-backdrop]",
      );

      if (backdrop) {
        gsap.fromTo(
          backdrop,
          {
            clipPath: "inset(0 0 100% 0)",
          },
          {
            clipPath: "inset(0 0 0% 0)",
            ease: "none",
            scrollTrigger: {
              trigger: backdrop,
              start: "top bottom",
              end: "top top",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // STORY IMAGES

      const storyCards = gsap.utils.toArray<HTMLElement>("[data-essence-card]");

      storyCards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 48,
            clipPath: "inset(8% 0 0 0)",
          },
          {
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 54%",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="khao-essence-title"
      className="relative bg-khao-bg"
    >
      <div
        className="
          px-4
          pb-12
          pt-12
          sm:pb-16
          sm:pt-20
          md:mb-24
          md:px-12
          md:pt-34
        "
      >
        <div data-essence-title className="mx-auto max-w-3xl text-center">
          <Title
            ornament="Essência"
            title="A Tailândia não se explica. Se sente.
"
            className="text-[clamp(2rem,5vw,4rem)]"
          />
        </div>

        <div
          data-essence-description-wrapper
          className="
            mx-auto
            mt-8
            grid
            max-w-350
            grid-cols-1
            gap-y-3
            sm:mt-10
            md:mt-25
            md:grid-cols-2
            md:gap-x-12
            md:gap-y-0
          "
        >
          <p
            data-essence-description
            className="
              khao-description
              w-[76%]
              max-w-80
              leading-relaxed
              tracking-widest
              text-khao-description
              md:w-auto
            "
          >
            KHAO nasceu do encontro entre tradição e contemporaneidade.
          </p>

          <p
            data-essence-description
            className="
              khao-description
              mt-10
              w-[84%]
              max-w-md
              justify-self-end
              text-right
              leading-relaxed
              tracking-widest
              text-khao-description
              md:mt-25
              md:w-auto
            "
          >
            Ingredientes, fogo, técnica e tradição se encontram em uma
            experiência criada para despertar os sentidos.
          </p>
        </div>
      </div>

      <div className="relative isolate bg-khao-bg">
        <div
          data-essence-backdrop
          className="
            sticky
            top-0
            z-0
            h-svh
            w-full
            max-w-none
            overflow-hidden
            motion-reduce:static
          "
        >
          <Image
            src={KHAO_ASSETS.essence.restaurant}
            alt="Salão do KHAO com mesas, plantas e iluminação acolhedora"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div
          className="
            relative
            z-10
            space-y-[clamp(2.5rem,6vw,5rem)]
            bg-linear-to-b
            from-transparent
            via-khao-surface/95
            to-khao-surface
            pt-[clamp(3rem,8vw,7rem)]
            pb-[clamp(5rem,11vw,9rem)]
          "
        >
          {STORY_IMAGES.map(({ src, alt }) => (
            <figure
              key={src}
              data-essence-card
              className="
                relative
                mx-auto
                aspect-[1.48]
                w-[86%]
                max-w-304
                overflow-hidden
                md:aspect-video
                md:w-[84%]
              "
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 86vw, (min-width: 90.5rem) 76rem, 84vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
