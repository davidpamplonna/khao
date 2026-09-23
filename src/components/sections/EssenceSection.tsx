"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { KHAO_STORY_ICON, ESSENCE_IMG } from "@/src/data/assets/image";
import { gsap } from "@/src/lib/gsap";
import { useReducedMotion } from "@/src/motion/use-reduced-motion";
import { Title } from "../ui/title";

export function EssenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        // ==========================================
        // HEADER
        // ==========================================

        const headerItems = gsap.utils.toArray<HTMLElement>(
          "[data-essence-header]",
        );

        if (headerItems.length) {
          gsap.fromTo(
            headerItems,
            {
              autoAlpha: 0,
              y: 32,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          );
        }

        // ==========================================
        // IMAGE REVEALS
        // ==========================================

        const revealContainers = gsap.utils.toArray<HTMLElement>(
          "[data-essence-reveal]",
        );

        revealContainers.forEach((container) => {
          const image = container.querySelector<HTMLElement>(
            "[data-essence-image]",
          );

          if (!image) return;

          gsap.set(container, {
            clipPath: "inset(0 0 100% 0)",
          });

          gsap.set(image, {
            scale: 1.12,
          });

          const reveal = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });

          reveal
            .to(container, {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.35,
              ease: "power4.inOut",
            })
            .to(
              image,
              {
                scale: 1,
                duration: 1.6,
                ease: "power2.out",
              },
              "-=1.15",
            );
        });

        // ==========================================
        // TEXT
        // ==========================================

        const textElements = gsap.utils.toArray<HTMLElement>(
          "[data-essence-text]",
        );

        textElements.forEach((text) => {
          gsap.fromTo(
            text,
            {
              autoAlpha: 0,
              y: 28,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: text,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        // ==========================================
        // ORNAMENTS
        // ==========================================

        const ornaments = gsap.utils.toArray<HTMLElement>(
          "[data-essence-ornament]",
        );

        ornaments.forEach((ornament) => {
          gsap.fromTo(
            ornament,
            {
              autoAlpha: 0,
              y: 18,
              scale: 0.92,
              rotate: 3,
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ornament,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        // ==========================================
        // PARALLAX
        // ==========================================

        const parallaxElements = gsap.utils.toArray<HTMLElement>(
          "[data-essence-parallax]",
        );

        parallaxElements.forEach((element) => {
          gsap.to(element, {
            yPercent: -7,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        // ==========================================
        // FIRE
        // ==========================================

        const fireImage = section.querySelector<HTMLElement>(
          "[data-essence-fire]",
        );

        if (fireImage) {
          gsap.to(fireImage, {
            scale: 1.08,
            yPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: fireImage,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      // ==========================================
      // MOBILE
      // ==========================================

      mm.add("(max-width: 768px)", () => {
        const headerItems = gsap.utils.toArray<HTMLElement>(
          "[data-essence-header]",
        );

        if (headerItems.length) {
          gsap.fromTo(
            headerItems,
            {
              autoAlpha: 0,
              y: 24,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        }

        const revealContainers = gsap.utils.toArray<HTMLElement>(
          "[data-essence-reveal]",
        );

        revealContainers.forEach((container) => {
          const image = container.querySelector<HTMLElement>(
            "[data-essence-image]",
          );

          if (!image) return;

          gsap.set(container, {
            clipPath: "inset(0 0 100% 0)",
          });

          gsap.set(image, {
            scale: 1.08,
          });

          const reveal = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });

          reveal
            .to(container, {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.1,
              ease: "power4.inOut",
            })
            .to(
              image,
              {
                scale: 1,
                duration: 1.3,
                ease: "power2.out",
              },
              "-=0.9",
            );
        });

        const textElements = gsap.utils.toArray<HTMLElement>(
          "[data-essence-text]",
        );

        textElements.forEach((text) => {
          gsap.fromTo(
            text,
            {
              autoAlpha: 0,
              y: 20,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: text,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        const ornaments = gsap.utils.toArray<HTMLElement>(
          "[data-essence-ornament]",
        );

        ornaments.forEach((ornament) => {
          gsap.fromTo(
            ornament,
            {
              autoAlpha: 0,
              y: 14,
              scale: 0.94,
              rotate: 2,
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ornament,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        // No parallax pesado no mobile.
      });
    }, section);

    return () => {
      context.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-khao-bg"
      aria-labelledby="khao-essence-title"
    >
      {" "}
      <div className="container mx-auto px-4 py-20 sm:px-8 md:px-12 md:py-32">
        {" "}
        <div className="relative mb-16 text-center md:mb-24">
          {" "}
          <span
            data-essence-header
            className="absolute left-0 top-0 text-left text-xs font-medium tracking-[0.2em] text-khao-gold md:text-sm"
          >
            {" "}
            01 / Essência{" "}
          </span>{" "}
          <div
            data-essence-header
            className="mx-auto max-w-170 pt-8 md:pt-6"
            id="khao-essence-title"
          >
            {" "}
            <Title
              title="A Tailândia não se explica."
              highlight="Se sente."
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="grid items-start gap-x-12 md:grid-cols-2">
          {" "}
          <div className="flex flex-col">
            {" "}
            {/* Chef */}{" "}
            <div
              data-essence-reveal
              className="relative aspect-16/10 w-full overflow-hidden"
            >
              {" "}
              <Image
                src={ESSENCE_IMG.chef_preparation}
                alt="Chef preparando ingredientes na cozinha do KHAO"
                fill
                priority={false}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-essence-image
              />{" "}
            </div>{" "}
            {/* Ornament */}{" "}
            <Image
              src={KHAO_STORY_ICON.khao_ornament}
              alt=""
              width={150}
              height={54}
              className="-mt-10 z-30 ml-1 h-auto w-28 sm:w-36"
              data-essence-ornament
              aria-hidden="true"
            />{" "}
            {/* Description */}{" "}
            <p
              data-essence-text
              className="khao-description mt-14 max-w-80  text-khao-description  md:mt-16"
            >
              {" "}
              Ingredientes, fogo, técnica e tradição se encontram em uma
              experiência criada para despertar os sentidos.{" "}
            </p>{" "}
            {/* Cocktail */}{" "}
            <div data-essence-parallax className="relative mt-8 sm:mt-12">
              {" "}
              {/* Image */}{" "}
              <div
                data-essence-reveal
                className="relative aspect-16/10 w-full overflow-hidden"
              >
                {" "}
                <Image
                  src={ESSENCE_IMG.cocktail_preparation}
                  alt="Bartender preparando um coquetel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  data-essence-image
                />{" "}
              </div>{" "}
              {/* Elephant */}{" "}
              <Image
                src={KHAO_STORY_ICON.khao_elephant}
                alt=""
                width={120}
                height={120}
                className=" absolute -bottom-16 right-8 z-30 h-auto w-24 sm:right-12 sm:w-32 "
                data-essence-ornament
                aria-hidden="true"
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="mt-12 flex flex-col md:mt-0">
            {" "}
            {/* Intro text */}{" "}
            <p
              data-essence-text
              className="khao-description max-w-64  text-khao-description  md:ml-1"
            >
              {" "}
              KHAO nasceu do encontro entre tradição e contemporaneidade.{" "}
            </p>{" "}
            {/* Fire / Wok */}{" "}
            <div
              data-essence-reveal
              className="relative mt-16 aspect-5/4 w-full overflow-hidden md:mt-24"
            >
              {" "}
              <Image
                src={ESSENCE_IMG.wok_fire}
                alt="Chef finalizando um prato sobre o fogo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-essence-image
                data-essence-fire
              />{" "}
            </div>{" "}
            {/* Lotus */}{" "}
            <Image
              src={KHAO_STORY_ICON.khao_lotus}
              alt=""
              width={150}
              height={54}
              className="-mt-6 z-30 ml-auto h-auto w-28 sm:w-36"
              data-essence-ornament
              aria-hidden="true"
            />{" "}
            {/* Final dish */}{" "}
            <div
              data-essence-reveal
              data-essence-parallax
              className="mt-8 aspect-video w-full overflow-hidden sm:mt-12"
            >
              {" "}
              <Image
                src={ESSENCE_IMG.dish_finishing}
                alt="Prato finalizado sendo servido"
                width={640}
                height={360}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-essence-image
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
