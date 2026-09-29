"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";

import { gsap } from "@/src/lib/gsap";
import { useReducedMotion } from "@/src/motion/use-reduced-motion";
import Link from "next/link";

import galleryItems from '@/src/data/gallery';

const INSTAGRAM_URL = "https://www.instagram.com/restobarkhao/";

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const context = gsap.context(() => {
      const swiper = section.querySelector(".gallery-swiper");
      const slides = section.querySelectorAll(".gallery-slide");

      if (reducedMotion) {
        gsap.set([swiper, slides], { opacity: 1, scale: 1, y: 0 });
        return;
      }

      gsap.set(swiper, { opacity: 0, scale: 1.04 });
      gsap.set(slides, { opacity: 0, y: 35 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
        .to(swiper, {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
        })
        .to(
          slides,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.9",
        );
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      id="restaurante"
      ref={sectionRef}
      aria-labelledby="gallery-title"
      className="overflow-hidden bg-khao-bg pb-20 pt-6 md:pb-28 md:pt-10"
    >
      {/* <div className="mx-auto mb-10 flex max-w-350 flex-col gap-8 px-5 sm:mb-12 sm:px-8 md:mb-16 lg:px-9 xl:flex-row xl:items-center xl:justify-between xl:gap-10"> */}
        <div className="max-w-350 mb-10 mx-auto flex flex-col px-5 md:flex-row md:justify-between gap-8 sm:mb-12 sm:px-8 md:mb-16 lg:px-0 xl:flex-row xl:items-center xl:justify-between">
        <p
          id="gallery-title"
          className="w-60 max-w-136 font-khao-description text-[clamp(1.02rem,1.8vw,1.2rem)] font-light leading-[1.35] tracking-[-0.03em] text-khao-white "
        >
          Veja quem escolheu
          <br className="hidden sm:block" /> viver a experiência KHAO.
        </p>

        <div className="flex w-full items-center gap-3 sm:w-auto md:gap-4">
          {/* <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-khao-white/80 px-4 text-xs text-khao-white transition-colors hover:bg-khao-white hover:text-khao-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-14 sm:flex-none sm:px-6 sm:text-sm md:h-16 md:px-8 md:text-base lg:px-9 lg:text-lg"
          >
            Ver no Instagram
          </Link> */}

           <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="border border-khao-white/80 h-12 flex flex-1 items-center justify-center rounded-full px-4 text-md text-khao-white whitespace-nowrap min-w-0 transition-colors duration-600 hover:bg-khao-white hover:text-khao-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-6 sm:text-sm md:text-base lg:px-8"
          >
            Ver no Instagram
          </Link>

          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Ver fotos anteriores"
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-khao-white/80 text-khao-white transition-colors hover:bg-khao-white hover:text-khao-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-10 md:size-13"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4 sm:size-5 md:size-6"
              strokeWidth={1.5}
            />
          </button>

          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Ver próximas fotos"
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-khao-white/80 text-khao-white transition-colors hover:bg-khao-white hover:text-khao-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-10 md:size-13"
          >
            <ArrowRight
              aria-hidden="true"
              className="size-4 sm:size-5 md:size-6"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>

      <div className="mx-auto  px-5 sm:px-8 lg:px-9">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1.1}
          spaceBetween={10}
          loop
          speed={1000}
          autoplay={
            reducedMotion
              ? false
              : {
                  delay: 3200,
                  disableOnInteraction: false,
                }
          }
          breakpoints={{
            480: { slidesPerView: 1.3, spaceBetween: 12 },
            640: { slidesPerView: 2.1, spaceBetween: 16 },
            768: { slidesPerView: 2.7, spaceBetween: 18 },
            1024: { slidesPerView: 3.3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 20 },
            1600: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className="gallery-swiper"
        >
          {galleryItems.map((item) => (
            <SwiperSlide key={item.src} className="gallery-slide h-auto!">
              <figure className="group relative aspect-[0.785] max-h-152 w-full overflow-hidden rounded-4xl bg-khao-black sm:rounded-[2.5rem] lg:rounded-[3rem]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1600px) 250px, (min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 768px) 33vw, (min-width: 640px) 44vw, (min-width: 480px) 72vw, 80vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
