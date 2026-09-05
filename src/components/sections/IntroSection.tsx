"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { gsap } from "@/src/lib/gsap";
import { RESTAURANT_IMG } from "@/src/types/images";

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleTopRef = useRef<HTMLSpanElement>(null);
  const titleBottomRef = useRef<HTMLSpanElement>(null);
  const imageOneRef = useRef<HTMLElement>(null);
  const imageTwoRef = useRef<HTMLElement>(null);
  const imageThreeRef = useRef<HTMLElement>(null);
  const flavorTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          [titleTopRef.current, titleBottomRef.current],
          { opacity: 0, y: 64 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          },
        );

        [
          imageOneRef.current,
          imageTwoRef.current,
          imageThreeRef.current,
        ].forEach((image, index) => {
          if (!image) return;

          gsap.fromTo(
            image,
            { opacity: 0, y: 96, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              delay: index * 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: image,
                start: "top 85%",
                once: true,
              },
            },
          );
        });

        gsap.fromTo(
          flavorTitleRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 1.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageOneRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );

        gsap.to(imageOneRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: imageOneRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to([imageTwoRef.current, imageThreeRef.current], {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => motion.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="intro-title"
      className="relative overflow-hidden bg-khao-bg"
    >
      <div className="container mx-auto px-6 py-16 sm:px-10 md:px-12 md:py-30">
        <h2 id="intro-title" className="khao-title uppercase">
          <span ref={titleTopRef} className="block">
            A Tailândia não se
          </span>
          <span ref={titleBottomRef} className="block">
            explica. Se sente.
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12">
          <figure
            ref={imageOneRef}
            className=" relative flex max-w-100 flex-col gap-8 md:col-span-4"
          >
            <Image
              src={RESTAURANT_IMG.khao_dish}
              alt="Prato do KHAO servido à mesa"
              width={920}
              height={520}
              sizes="(min-width: 768px) 33vw, 100vw"
            />
            <figcaption className="text-xl leading-[1.65] text-khao-white/70">
              Uma cozinha de contrastes. Frescor e calor. Doçura e acidez.
              Intensidade e delicadeza. No KHAO, cada elemento encontra seu
              lugar para transformar sabores em experiência.
            </figcaption>

            <div className="block md:absolute top-130">
              <h3 ref={flavorTitleRef} className="khao-title uppercase">
                O SABOR COMEÇA ANTES DA PRIMEIRA MORDIDA
              </h3>
            </div>
          </figure>

          <figure
            ref={imageTwoRef}
            className="flex flex-col gap-8 md:col-span-8 md:flex-row md:items-end"
          >
            <Image
              src={RESTAURANT_IMG.khao_detail}
              alt="Detalhe de um prato da cozinha do KHAO"
              width={420}
              height={420}
              sizes="(min-width: 768px) 33vw, 100vw"
            />
            <div>
              <figcaption className="mb-4 text-xl leading-[1.65] text-khao-white/70">
                Na cozinha tailandesa, nenhum sabor existe sozinho. O doce
                encontra o ácido. O picante encontra o frescor. A intensidade
                encontra o equilíbrio.
              </figcaption>
              <Image
                src={RESTAURANT_IMG.khao_fire}
                alt="Chamas na cozinha do KHAO"
                width={420}
                height={420}
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          </figure>

          <figure ref={imageThreeRef} className="md:col-span-8 md:col-start-5">
            <Image
              src={RESTAURANT_IMG.khao_res}
              alt="Interior do restaurante KHAO"
              width={920}
              height={920}
              sizes="(min-width: 768px) 66vw, 100vw"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
