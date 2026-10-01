"use client";

import { MENU_CATEGORIES } from "@/src/data/menu";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { KHAO_ASSETS } from "@/src/config/khao-assets";
import { gsap } from "@/src/lib/gsap";
import { useReducedMotion } from "@/src/motion/use-reduced-motion";
import type { MenuDish } from "@/src/types/menu";

import { MenuModal } from "./MenuModal";
import { Title } from "../ui/title";
import { Button } from "../ui/button";

const MENU_DESCRIPTION = "Uma seleção dos sabores que definem o KHAO.";

type CategoryId = (typeof MENU_CATEGORIES)[number]["id"];

const CATEGORY_CARD_IMAGES: Record<CategoryId, string> = {
  starters: KHAO_ASSETS.menu.menu_poster.dishes,
  desserts: KHAO_ASSETS.menu.menu_poster.desserts,
  drinks: KHAO_ASSETS.menu.menu_poster.drinks,
};

const CATEGORY_CARDS = MENU_CATEGORIES.map((category) => ({
  categoryId: category.id,
  label: category.label,
  image:
    CATEGORY_CARD_IMAGES[category.id as CategoryId] ??
    category.dishes[0]?.image ??
    KHAO_ASSETS.menu.menu_poster.dishes,
  alt: category.dishes[0]?.alt ?? `${category.label} do menu KHAO`,
}));

type MenuItem = MenuDish & {
  price?: string;
};

const MENU_ITEMS = MENU_CATEGORIES.reduce(
  (accumulator, category) => {
    accumulator[category.id as CategoryId] = category.dishes.map((dish) => ({
      ...dish,
      price: dish.number,
    }));

    return accumulator;
  },
  {} as Record<CategoryId, readonly MenuItem[]>,
);

/**
 * --------------------------------------------------------------------------
 * MAIN SECTION
 * --------------------------------------------------------------------------
 */

export function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

  /**
   * ------------------------------------------------------------------------
   * OPEN / CLOSE MODAL
   * ------------------------------------------------------------------------
   */

  const openCategory = useCallback(
    (category: CategoryId, button: HTMLButtonElement) => {
      triggerButtonRef.current = button;
      setActiveCategory(category);
    },
    [],
  );

  const closeCategory = useCallback(() => {
    setActiveCategory(null);

    requestAnimationFrame(() => {
      triggerButtonRef.current?.focus();
    });
  }, []);

  /**
   * ------------------------------------------------------------------------
   * SECTION ANIMATIONS
   * ------------------------------------------------------------------------
   */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      /**
       * TITLE
       */

      const titleHeading = section.querySelector<HTMLElement>(
        "[data-menu-title] h2",
      );

      if (titleHeading) {
        gsap.fromTo(
          titleHeading,
          {
            autoAlpha: 0.08,
            y: 18,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "[data-menu-title]",
              start: "top 78%",
              once: true,
            },
          },
        );
      }

      /**
       * DESCRIPTION
       */

      const descriptionWords = gsap.utils.toArray<HTMLElement>(
        "[data-menu-description-word]",
      );

      if (descriptionWords.length) {
        gsap.fromTo(
          descriptionWords,
          {
            autoAlpha: 0.15,
            y: 22,
          },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "[data-menu-description]",
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      /**
       * CARDS
       */

      const cards = gsap.utils.toArray<HTMLElement>("[data-menu-card]");

      const cardsContainer =
        section.querySelector<HTMLElement>("[data-menu-cards]");

      if (cards.length && cardsContainer) {
        const media = gsap.matchMedia();

        /**
         * DESKTOP
         */

        media.add("(min-width: 1024px)", () => {
          const cardsTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: cardsContainer,
              start: "top 78%",
              once: true,
            },
          });

          cards.forEach((card, index) => {
            const image = card.querySelector<HTMLElement>(
              "[data-menu-card-image]",
            );

            const label = card.querySelector<HTMLElement>(
              "[data-menu-card-label]",
            );

            const position = index * 0.42;

            cardsTimeline.fromTo(
              card,
              {
                autoAlpha: 0,
                rotateY: 24,
                y: 22,
              },
              {
                autoAlpha: 1,
                rotateY: 0,
                y: 0,
                duration: 1.1,
                ease: "power2.out",
              },
              position,
            );

            if (image) {
              cardsTimeline.fromTo(
                image,
                {
                  scale: 1.1,
                },
                {
                  scale: 1,
                  duration: 1.25,
                  ease: "power2.out",
                },
                position,
              );
            }

            if (label) {
              cardsTimeline.fromTo(
                label,
                {
                  autoAlpha: 0,
                  y: 16,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.65,
                  ease: "power2.out",
                },
                position + 0.4,
              );
            }
          });
        });

        /**
         * MOBILE / TABLET
         */

        media.add("(max-width: 1023px)", () => {
          cards.forEach((card) => {
            const image = card.querySelector<HTMLElement>(
              "[data-menu-card-image]",
            );

            const label = card.querySelector<HTMLElement>(
              "[data-menu-card-label]",
            );

            const cardTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            });

            cardTimeline.fromTo(
              card,
              {
                autoAlpha: 0,
                y: 38,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
              },
            );

            if (image) {
              cardTimeline.fromTo(
                image,
                {
                  scale: 1.09,
                },
                {
                  scale: 1,
                  duration: 1.15,
                  ease: "power2.out",
                },
                0,
              );
            }

            if (label) {
              cardTimeline.fromTo(
                label,
                {
                  autoAlpha: 0,
                  y: 14,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                },
                0.35,
              );
            }
          });
        });
      }

      /**
       * CTA
       */

      const button = section.querySelector<HTMLElement>("[data-menu-button]");

      if (button) {
        gsap.fromTo(
          button,
          {
            autoAlpha: 0,
            y: 28,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: button,
              start: "top 92%",
              once: true,
            },
          },
        );
      }
    }, section);

    return () => {
      context.revert();
    };
  }, [reducedMotion]);

  /**
   * ------------------------------------------------------------------------
   * RENDER
   * ------------------------------------------------------------------------
   */

  return (
    <>
      <section
        id="cardapio"
        ref={sectionRef}
        className="
          relative
          isolate
          overflow-hidden
          bg-khao-bg
          px-[clamp(1.1rem,3.45vw,3.5rem)]
          pt-[clamp(5.5rem,7vw,8rem)]
          pb-[clamp(5rem,8vw,8rem)]
        "
      >
        {/* BACKGROUND GLOW */}

        <Image
          src={KHAO_ASSETS.brand.khao_glow}
          width={200}
          height={200}
          loading="lazy"
          quality={75}
          alt=""
          aria-hidden="true"
          sizes="(max-width: 767px) 14rem, 31.5rem"
          className="
            pointer-events-none
            absolute
            left-0
            top-[20%]
            w-56
            md:w-126
          "
        />

        {/* BACKGROUND SMOKE */}

        <Image
          src={KHAO_ASSETS.brand.khao_smok}
          width={200}
          height={200}
          loading="lazy"
          quality={75}
          alt=""
          aria-hidden="true"
          sizes="(max-width: 767px) 14rem, 31.5rem"
          className="
            pointer-events-none
            absolute
            -right-4
            top-[50%]
            w-56
            md:w-126
          "
        />

        <div className="relative z-10 mx-auto w-full max-w-376">
          {/* HEADER */}

          <div
            className="
              relative
              z-10
              mx-auto
              flex
              w-full
              max-w-350
              flex-col
              gap-20
            "
          >
            {/* TITLE */}

            <div
              data-menu-title
              className="
                text-center
                md:mx-auto
                md:w-170
                md:max-w-200
              "
            >
              <Title
                ornament="Menu"
                title={`O difícil não é escolher.
É escolher só um.`}
                className="text-[clamp(2rem,5vw,4rem)]"
              />
            </div>

            {/* DESCRIPTION */}

            <p
              data-menu-description
              className="
                khao-description
                w-80
                leading-relaxed
                tracking-widest
              "
              aria-label={MENU_DESCRIPTION}
            >
              {MENU_DESCRIPTION.split(" ").map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  data-menu-description-word
                  aria-hidden="true"
                  className="mr-[0.28em] inline-block"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>

          {/* CATEGORY CARDS */}

          <div
            data-menu-cards
            className="
              mt-11
              grid
              grid-cols-1
              gap-x-8
              gap-y-14
              sm:grid-cols-2
              lg:mt-[clamp(2.8rem,5.4vw,5.25rem)]
              lg:grid-cols-3
              lg:gap-y-20
            "
            style={{
              perspective: "1400px",
            }}
          >
            {CATEGORY_CARDS.map((category) => (
              <button
                key={category.categoryId}
                type="button"
                data-menu-card
                onClick={(event) =>
                  openCategory(category.categoryId, event.currentTarget)
                }
                aria-label={`Abrir ${category.label.toLowerCase()}`}
                className="
                  group
                  relative
                  block
                  aspect-[0.82]
                  w-full
                  cursor-pointer
                  bg-transparent
                  p-0
                  text-left
                  text-inherit
                  focus-visible:outline-none
                "
              >
                {/* IMAGE */}

                <span
                  className="
                    absolute
                    inset-0
                    overflow-hidden
                  "
                >
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    quality={100}
                    loading="lazy"
                    data-menu-card-image
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 45vw, 30vw"
                    className="
                      object-cover
                      transition-all
                      duration-700
                      group-hover:scale-[1.04]
                      group-hover:brightness-[1.08]
                      group-focus-visible:scale-[1.04]
                      group-focus-visible:brightness-[1.08]
                      motion-reduce:transition-none
                    "
                  />

                  {/* BORDER */}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      border
                      border-transparent
                      transition-colors
                      duration-500
                      group-hover:border-khao-gold/40
                      group-focus-visible:border-khao-gold/60
                    "
                  />

                  {/* GRADIENT */}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-x-0
                      bottom-0
                      top-[45%]
                      bg-linear-to-b
                      from-transparent
                      to-khao-black/45
                      opacity-70
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                      group-focus-visible:opacity-100
                    "
                  />

                  {/* ARROW */}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      right-4
                      top-4
                      grid
                      size-11
                      translate-y-1
                      place-items-center
                      rounded-full
                      border
                      border-khao-white/50
                      bg-khao-black/30
                      text-khao-white
                      opacity-0
                      transition
                      duration-300
                      group-hover:translate-y-0
                      group-hover:opacity-100
                      group-focus-visible:translate-y-0
                      group-focus-visible:opacity-100
                      max-[700px]:translate-y-0
                      max-[700px]:opacity-100
                      motion-reduce:transition-none
                    "
                  >
                    <ArrowRight size={20} strokeWidth={1.3} />
                  </span>

                  {/* FOCUS */}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      outline
                      outline-transparent
                      outline-offset-[5px]
                      group-focus-visible:outline-khao-gold
                    "
                  />
                </span>

                {/* CATEGORY LABEL */}

                <span
                  data-menu-card-label
                  className="
                    absolute
                    bottom-[-0.40em]
                    right-0
                    whitespace-nowrap
                    text-right
                    font-khao-title
                    text-[clamp(2.2rem,5vw,3rem)]
                    font-bold
                    leading-none
                    text-khao-gold
                    drop-shadow-2xl
                  "
                >
                  {category.label}
                </span>
              </button>
            ))}
          </div>

          {/* CTA */}

          <div
            className="
              mt-[clamp(5rem,9vw,8.5rem)]
              flex
              justify-center
            "
          >
            <Button
              data-menu-button
              type="button"
              variant="secondary"
              href="#pdf"
            >
              Ver menu completo
            </Button>
          </div>
        </div>
      </section>

      {/* MODAL */}

      {activeCategory && (
        <MenuModal
          category={activeCategory}
          items={MENU_ITEMS[activeCategory]}
          reducedMotion={reducedMotion}
          onClose={closeCategory}
        />
      )}
    </>
  );
}
