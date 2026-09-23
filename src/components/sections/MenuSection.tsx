"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { MENU_CATEGORIES } from "@/src/data/menu";
import { KHAO_BRAND, KHAO_ORNAMENT } from "@/src/data/assets/image";
import { gsap } from "@/src/lib/gsap";
import type { MenuCategory, MenuDish } from "@/src/types/menu";
import { Title } from "../ui/title";
import { Button } from "../ui/button";

const INITIAL_CATEGORY_ID = "starters";

function getCategory(categoryId: string) {
  return (
    MENU_CATEGORIES.find(({ id }) => id === categoryId) ?? MENU_CATEGORIES[0]
  );
}

function getDishIndex(category: MenuCategory, dishId: string) {
  const index = category.dishes.findIndex(({ id }) => id === dishId);
  return index < 0 ? 0 : index;
}

export function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const isAnimating = useRef(false);
  const transitionDirection = useRef<1 | -1>(1);
  const initialCategory = getCategory(INITIAL_CATEGORY_ID);
  const [activeCategoryId, setActiveCategoryId] = useState(initialCategory.id);
  const [activeDishIndex, setActiveDishIndex] = useState(
    getDishIndex(initialCategory, "satay"),
  );
  const activeCategory = getCategory(activeCategoryId);
  const dishes = activeCategory.dishes;
  const dish = dishes[activeDishIndex] ?? dishes[0];

  useLayoutEffect(() => {
    if (!imageRef.current || !numberRef.current || !contentRef.current) return;
    const elements = [imageRef.current, numberRef.current, contentRef.current];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(elements, { clearProps: "all" });
      return;
    }

    const direction = transitionDirection.current;
    gsap.set(imageRef.current, {
      autoAlpha: 0,
      x: direction * 55,
      scale: 0.94,
    });
    gsap.set(numberRef.current, { autoAlpha: 0, x: direction * 20 });
    gsap.set(contentRef.current, { autoAlpha: 0, y: 18 });
    const timeline = gsap.timeline();
    timeline
      .to(imageRef.current, {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      })
      .to(
        numberRef.current,
        { autoAlpha: 1, x: 0, duration: 0.45, ease: "power3.out" },
        "-=0.48",
      )
      .to(
        contentRef.current,
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
        "-=0.3",
      );

    return () => {
      timeline.kill();
    };
  }, [activeCategoryId, activeDishIndex]);

  const changeDish = useCallback(
    (direction: 1 | -1) => {
      if (
        isAnimating.current ||
        !imageRef.current ||
        !numberRef.current ||
        !contentRef.current
      )
        return;
      isAnimating.current = true;
      transitionDirection.current = direction;
      const nextIndex =
        (activeDishIndex + direction + dishes.length) % dishes.length;
      const timeline = gsap.timeline({
        onComplete: () => {
          setActiveDishIndex(nextIndex);
          requestAnimationFrame(() => {
            isAnimating.current = false;
          });
        },
      });
      timeline
        .to(imageRef.current, {
          autoAlpha: 0,
          x: direction * -55,
          scale: 0.94,
          duration: 0.35,
          ease: "power2.in",
        })
        .to(
          numberRef.current,
          {
            autoAlpha: 0,
            x: direction * -20,
            duration: 0.25,
            ease: "power2.in",
          },
          "-=0.25",
        )
        .to(
          contentRef.current,
          { autoAlpha: 0, y: -12, duration: 0.3, ease: "power2.in" },
          "-=0.22",
        );
    },
    [activeDishIndex, dishes.length],
  );

  const changeCategory = useCallback(
    (category: MenuCategory) => {
      if (
        category.id === activeCategoryId ||
        isAnimating.current ||
        !imageRef.current ||
        !numberRef.current ||
        !contentRef.current
      )
        return;
      isAnimating.current = true;
      transitionDirection.current = 1;
      const elements = [
        imageRef.current,
        numberRef.current,
        contentRef.current,
      ];
      gsap
        .timeline({
          onComplete: () => {
            setActiveCategoryId(category.id);
            setActiveDishIndex(0);
            requestAnimationFrame(() => {
              isAnimating.current = false;
            });
          },
        })
        .to(elements, {
          autoAlpha: 0,
          y: -18,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.in",
        });
    },
    [activeCategoryId, setActiveCategoryId],
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    touchStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = event.clientX - touchStartX.current;
    touchStartX.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (Math.abs(delta) >= 50) changeDish(delta < 0 ? 1 : -1);
  };

  const handlePointerCancel = () => {
    touchStartX.current = null;
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const context = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-menu-reveal]"),
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        },
      );
      gsap.fromTo(
        section.querySelector("[data-menu-stage]"),
        { autoAlpha: 0, scale: 0.96, y: 30 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        },
      );
    }, section);
    return () => context.revert();
  }, []);

  const previousDish =
    dishes[(activeDishIndex - 1 + dishes.length) % dishes.length];
  const nextDish = dishes[(activeDishIndex + 1) % dishes.length];

  return (
    <section
      id="cardapio"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-khao-bg py-20 sm:py-24 md:py-28"
    >
      {/* ORNAMENT TOP*/}
      <Image
        src={KHAO_ORNAMENT.khao_light}
        width={530}
        height={530}
        alt="Decoração"
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 -top-20 z-0 w-180 select-none opacity-30 sm:-left-24 sm:-top-20 sm:w-100 md:-left-20 md:-top-16 md:w-120 lg:-left-12 lg:w-132 "
      />
      <Image
        src={KHAO_ORNAMENT.khao_pattern}
        width={200}
        height={200}
        alt="Decoração"
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 top-0 z-0 w-32 select-none opacity-70 sm:w-40 md:-right-4 md:w-48 lg:w-52"
      />
      {/* ORNAMENT LATERAIS */}
      <Image
        src={KHAO_BRAND.khao_glow}
        width={200}
        height={200}
        alt="Decoração"
        aria-hidden="true"
        // pointer-events-none absolute left-0 top-[50%] w-126 -translate-x-1/2 -translate-y-1/2 select-none opacity-90 md:w-96 lg:w-md
        className="pointer-events-none absolute left-0 top-[30%] w-56 md:w-126 "
      />
      <Image
        src={KHAO_BRAND.khao_smok}
        width={200}
        height={200}
        alt="Decoração"
        aria-hidden="true"
        // pointer-events-none absolute left-0 top-[50%] w-126 -translate-x-1/2 -translate-y-1/2 select-none opacity-90 md:w-96 lg:w-md
        className="pointer-events-none absolute -right-4 top-[50%] w-56 md:w-126 "
      />
      {/* CONTEINER */}
      <div className="relative z-10 mx-auto flex min-h-180 w-full max-w-350 flex-col px-3 md:px-0">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-70 md:max-w-150">
            <Title
              eyebrow="02 / Menu"
              title="O difícil não é escolher. É escolher "
              highlight="só um."
            />
          </div>
          <p className="w-full max-w-60 khao-description leading-relaxed md:mb-2">
            Uma seleção dos sabores que definem o KHAO
          </p>
        </div>
        <nav
          data-menu-reveal
          aria-label="Categorias do cardápio"
          className="mt-14 flex flex-wrap gap-x-7 gap-y-4  border-b pb-6 border-khao-white/15 pt-5 md:mt-20 md:justify-center md:gap-x-10"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = category.id === activeCategoryId;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => changeCategory(category)}
                aria-pressed={isActive}
                className="group relative text-[10px] font-medium uppercase tracking-[0.18em] md:text-xs"
              >
                <span
                  className={`mr-2 transition-colors ${isActive ? "text-khao-gold" : "text-khao-white/70 group-hover:text-khao-gold"}`}
                >
                  {category.number}
                </span>
                <span
                  className={`transition-colors ${isActive ? "text-khao-gold" : "text-khao-white/70 group-hover:text-khao-gold"}`}
                >
                  {category.label}
                </span>
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-khao-gold transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </button>
            );
          })}
        </nav>
        <div
          data-menu-stage
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          className="relative mt-12 grid flex-1 touch-pan-y select-none items-center gap-8 md:mt-14 md:min-h-105 md:grid-cols-[0.8fr_1.4fr_0.8fr] md:gap-6 lg:min-h-115"
        >
          <PreviewDish dish={previousDish} alignment="left" />
          <article className="order-first flex min-w-0 flex-col items-center text-center md:order-0">
            <span
              ref={numberRef}
              className="mb-1 font-khao-title text-4xl text-khao-gold md:text-5xl "
            >
              {dish.number}
            </span>
            <div
              ref={imageRef}
              className="relative flex aspect-[3/2] w-full max-w-120 items-center justify-center will-change-transform"
            >
              <Image
                src={dish.image}
                alt={dish.alt}
                width={720}
                height={480}
                priority
                className="h-full w-full object-contain"
                sizes="(max-width: 767px) 92vw, 480px"
              />
            </div>
            <div
              ref={contentRef}
              aria-live="polite"
              className="flex min-w-0 flex-col items-center will-change-transform"
            >
              <h3 className="mt-4 max-w-90 font-khao-title text-[clamp(1.5rem,3vw,2.4rem)] font-bold uppercase leading-[1.05] tracking-[0.18em] text-khao-gold">
                {dish.name}
              </h3>
              <p className="mt-3 max-w-72 text-xs font-medium leading-[1.55] text-khao-description md:text-sm">
                {dish.description}
              </p>
            </div>
          </article>
          <PreviewDish dish={nextDish} alignment="right" />
        </div>
        <div
          data-menu-reveal
          className="mt-12 flex flex-col-reverse gap-8 md:flex-row items-center justify-between md:mt-8"
        >
          <Button type="button" variant="secondary" href="#menu-completo">
            Ver menu completo
          </Button>
          {/* <a
            href="#menu-completo"
            className="text-xs font-bold text-khao-white transition-colors hover:text-khao-gold md:text-sm"
          >
            Ver menu completo <span aria-hidden="true">→</span>
          </a> */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => changeDish(-1)}
              aria-label="Prato anterior"
              className="group flex size-9 items-center justify-center rounded-full border border-khao-white text-khao-white transition-all duration-300 hover:border-khao-gold hover:bg-khao-gold hover:text-khao-black"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => changeDish(1)}
              aria-label="Próximo prato"
              className="group flex size-9 items-center justify-center rounded-full bg-khao-white text-khao-black transition-all duration-300 hover:bg-khao-gold"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewDish({
  dish,
  alignment,
}: {
  dish: MenuDish;
  alignment: "left" | "right";
}) {
  const isRight = alignment === "right";
  return (
    <article
      data-menu-side
      aria-label={`${dish.name}, prato lateral`}
      className={`hidden min-w-0 md:flex md:flex-col ${isRight ? "items-end text-right" : "items-start"}`}
    >
      <span className="mb-1 font-khao-title text-3xl leading-none text-khao-gold md:text-4xl">
        {dish.number}
      </span>
      <div className="flex h-35 w-full max-w-55 items-center justify-center lg:h-40 lg:max-w-60">
        <Image
          src={dish.image}
          alt={dish.alt}
          width={420}
          height={280}
          className="h-auto max-h-full w-full object-contain opacity-55 grayscale-20 transition-opacity duration-500"
          sizes="(max-width: 1023px) 18vw, 15vw"
        />
      </div>
      <div className="mt-3 max-w-48 md:mt-5 lg:max-w-52">
        <h3 className="font-khao-title text-base font-bold uppercase tracking-[0.16em] text-khao-white/60">
          {dish.name}
        </h3>
        <p className="mt-2 text-[10px] leading-[1.45] text-khao-description/60 md:text-xs">
          {dish.description}
        </p>
      </div>
    </article>
  );
}
