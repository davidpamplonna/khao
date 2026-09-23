"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { combos } from "@/src/data/combo";
import { gsap } from "@/src/lib/gsap";

import { Button } from "../ui/button";
import { Title } from "../ui/title";

export function CombosSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (
      !section ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        ({ conditions }) => {
          const isDesktop = Boolean(conditions?.desktop);
          const header = gsap.utils.toArray<HTMLElement>(
            "[data-combos-header]",
          );
          const images = gsap.utils.toArray<HTMLElement>("[data-combos-image]");
          const text = gsap.utils.toArray<HTMLElement>("[data-combos-text]");

          gsap.fromTo(
            header,
            { autoAlpha: 0, y: isDesktop ? 32 : 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: isDesktop ? 1 : 0.8,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: isDesktop ? "top 82%" : "top 88%",
                toggleActions: "play none none none",
              },
            },
          );

          images.forEach((image) => {
            const reveal = image.parentElement;

            if (!reveal) return;

            gsap.set(reveal, { clipPath: "inset(0 0 100% 0)" });
            gsap.set(image, { scale: 1.12 });

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: reveal,
                  start: isDesktop ? "top 78%" : "top 86%",
                  toggleActions: "play none none none",
                },
              })
              .to(reveal, {
                clipPath: "inset(0 0 0% 0)",
                duration: isDesktop ? 1.25 : 1,
                ease: "power4.inOut",
              })
              .to(
                image,
                {
                  scale: 1,
                  duration: isDesktop ? 1.5 : 1.2,
                  ease: "power2.out",
                },
                "-=1",
              );

            if (isDesktop) {
              gsap.to(image, {
                yPercent: -5,
                ease: "none",
                scrollTrigger: {
                  trigger: reveal,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });
            }
          });

          text.forEach((element) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0, y: isDesktop ? 26 : 20 },
              {
                autoAlpha: 1,
                y: 0,
                duration: isDesktop ? 0.85 : 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: isDesktop ? "top 88%" : "top 92%",
                  toggleActions: "play none none none",
                },
              },
            );
          });
        },
      );

      return () => media.revert();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-khao-bg px-4 pb-24 pt-20 sm:px-8 md:px-12 md:pb-36 md:pt-32"
      aria-labelledby="combos-title"
    >
      <div className="mx-auto max-w-350">
        <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-8 md:mb-24">
          <Title
            id="combos-title"
            data-combos-header
            title={
              <>
                <span className="block">Duas</span>
                <span className="block text-khao-gold">Experiências.</span>
              </>
            }
            titleClassName="text-[clamp(2rem,5.2vw,4.5rem)]"
            className="max-w-[60%] md:max-w-none"
          />
          <p
            data-combos-header
            className="khao-description max-w-50 pt-1 text-left  md:text-right leading-tight sm:max-w-56 md:pt-4"
          >
            Uma para descobrir.
            <br />
            Outra para se entregar.
          </p>
        </div>

        <div className="space-y-16 md:space-y-28">
          {combos.map((combo) => {
            const comboLabel = combo.title.replace("KHAO ", "");

            return (
              <article id={combo.id} key={combo.id}>
                <div className="relative aspect-[2.35/1] w-full overflow-hidden">
                  <Image
                    src={combo.image}
                    alt={combo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 1400px"
                    className="object-cover will-change-transform"
                    data-combos-image
                  />
                </div>
                <div
                  data-combos-text
                  className="mt-8 max-w-120 sm:mt-10 md:mt-12"
                >
                  <h3 className="font-khao-title text-[clamp(1.6rem,3vw,3rem)] uppercase leading-none">
                    {combo.title.split(" ").map((word, index) => (
                      <span
                        key={`${combo.id}-${word}`}
                        className={index === 0 ? "mr-2" : "text-khao-gold"}
                      >
                        {word}
                      </span>
                    ))}
                  </h3>
                  <p className="khao-description mt-3 max-w-72 leading-[1.35]  md:mt-4">
                    {combo.description}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.08em] text-khao-gold sm:mt-5 sm:text-sm">
                    {combo.items.join(" · ")}
                  </p>
                  <Button
                    href={`#${combo.id}`}
                    variant="secondary"
                    className="mt-6 min-h-0! w-fit! min-w-0! px-3 py-2 sm:mt-7"
                  >
                    EXPERIMENTAR O {comboLabel}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
