"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { KHAO_ASSETS } from "@/src/config/khao-assets";
import { Title } from "../ui/title";
import { Button } from "../ui/button";

import { gsap } from "@/src/lib/gsap";
import { useReducedMotion } from "@/src/motion/use-reduced-motion";

const CATEGORY_CARDS = [
  {
    categoryId: "mains",
    label: "PRATOS",
    image: KHAO_ASSETS.menu_poster.dishes,
    alt: "Pad thai de camarão servido em bowl escuro",
  },
  {
    categoryId: "desserts",
    label: "SOBREMESAS",
    image: KHAO_ASSETS.menu_poster.desserts,
    alt: "Mango sticky rice com manga fresca e leite de coco",
  },
  {
    categoryId: "drinks",
    label: "DRINKS",
    image: KHAO_ASSETS.menu_poster.drinks,
    alt: "Drink gelado servido com gelo e especiarias",
  },
] as const;

export function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || reducedMotion) return;

    const context = gsap.context(() => {
      const header = gsap.utils.toArray<HTMLElement>("[data-menu-header]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-menu-card]");
      const button = section.querySelector<HTMLElement>("[data-menu-button]");

      header.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      if (button) {
        gsap.fromTo(
          button,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: button,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      id="cardapio"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-khao-bg px-[clamp(1.1rem,3.45vw,3.5rem)] pt-[clamp(5.5rem,7vw,8rem)] pb-[clamp(5rem,8vw,8rem)]"
    >
      {/* backgrounds */}
      <Image
        src={KHAO_ASSETS.brand.khao_glow}
        width={200}
        height={200}
        alt="Decoração"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[20%] w-56 md:w-126 "
      />
      <Image
        src={KHAO_ASSETS.brand.khao_smok}
        width={200}
        height={200}
        alt="Decoração"
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-[50%] w-56 md:w-126 "
      />
      
      <div className="relative z-10 mx-auto w-full max-w-376">
        {/* titulo */}
        <div className="relative z-10 mx-auto w-full max-w-350 flex flex-col gap-20">
          <div
            data-menu-header
            className="md:w-170 md:max-w-200 md:mx-auto text-center"
          >
            <Title
              ornament="Menu"
              title="O difícil não é escolher. É escolher só um."
              className="text-[clamp(2rem,5vw,4rem)]"
            />
          </div>
          <p data-menu-header className="khao-description w-60">
            Uma seleção dos sabores que definem o KHAO.
          </p>
        </div>
        {/* conteudo */}
        <div className="mt-11 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-[clamp(2.8rem,5.4vw,5.25rem)] lg:grid-cols-3 lg:gap-y-20">
          {CATEGORY_CARDS.map((category) => (
            <button
              key={category.categoryId}
              type="button"
              data-menu-card
              className="group relative block aspect-[0.82] w-full cursor-pointer bg-transparent p-0 text-left text-inherit focus-visible:outline-none"
            >
              <span className="absolute inset-0 overflow-hidden bg-khao-black">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 639px) 92vw, (max-width: 1023px) 45vw, 30vw"
                  className="object-cover transition-all duration-700 group-hover:scale-[1.045] group-hover:brightness-[1.08] group-focus-visible:scale-[1.045] group-focus-visible:brightness-[1.08] motion-reduce:transition-none"
                />

                {/* efeitos */}
                <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-khao-gold/40 group-focus-visible:border-khao-gold/60" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 top-[45%] bg-linear-to-b from-transparent to-khao-black/45 opacity-70 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />

                {/* buttom */}
                <span className="pointer-events-none absolute right-4 top-4 grid size-11 translate-y-1 place-items-center rounded-full border border-khao-white/50 bg-khao-black/30 text-khao-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-[700px]:translate-y-0 max-[700px]:opacity-100 motion-reduce:transition-none">
                  <ArrowRight size={20} strokeWidth={1.3} />
                </span>

                <span className="pointer-events-none absolute inset-0 outline outline-transparent outline-offset-[5px] group-focus-visible:outline-khao-gold" />
              </span>
              <span className="font-khao-title text-khao-gold absolute bottom-[-0.40em] right-0 whitespace-nowrap text-right text-[clamp(2.2rem,5vw,3rem)] font-bold leading-none drop-shadow-2xl">
                {category.label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-[clamp(5rem,9vw,8.5rem)] flex justify-center">
          <Button
            data-menu-button
            type="buttom"
            variant="secondary"
            href={"#pdf"}
          >
            Ver menu completo
          </Button>
        </div>
      </div>
    </section>
  );
}
