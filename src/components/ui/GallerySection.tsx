"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { X } from "lucide-react";

import "swiper/css";

import { KHAO_gallery } from "@/src/data/assets/image";
import { gsap } from "@/src/lib/gsap";
import { setScrollLocked } from "@/src/motion/scroll-lock";
import { useReducedMotion } from "@/src/motion/use-reduced-motion";

const galleryItems = [
  {
    src: KHAO_gallery.restaurant_01,
    alt: "Ambiente do restaurante KHAO",
  },
  {
    src: KHAO_gallery.restaurant_02,
    alt: "Sala com ambiente acolhedor e elegante",
  },
  {
    src: KHAO_gallery.restaurant_03,
    alt: "Detalhe de ambiente gourmet",
  },
  {
    src: KHAO_gallery.restaurant_04,
    alt: "Vista interna da casa de jantar",
  },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryItems)[number] | null
  >(null);

  const sectionRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!selectedImage) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    document.body.style.overflow = "hidden";
    setScrollLocked(true);
    closeButtonRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      setScrollLocked(false);

      if (openerRef.current?.isConnected) openerRef.current.focus();
    };
  }, [selectedImage]);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const swiper = section.querySelector(".gallery-swiper");
      const slides = section.querySelectorAll(".gallery-slide");

      if (reducedMotion) {
        gsap.set([swiper, slides], { opacity: 1, scale: 1, y: 0 });
        return;
      }

      gsap.set(swiper, {
        opacity: 0,
        scale: 1.04,
      });

      gsap.set(slides, {
        opacity: 0,
        y: 35,
      });

      // Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Entrada da galeria
      tl.to(swiper, {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
      }).to(
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

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <>
      <section
        id="restaurante"
        ref={sectionRef}
        className="bg-khao-bg pb-24 pt-2 md:pb-32"
      >
        <div className="w-full overflow-hidden">
          <Swiper
            modules={[Autoplay, FreeMode]}
            slidesPerView={4}
            freeMode={true}
            loop={true}
            speed={1800}
            spaceBetween={8}
            autoplay={
              reducedMotion
                ? false
                : {
                    delay: 2800,
                    disableOnInteraction: false,
                  }
            }
            breakpoints={{
              0: { slidesPerView: 1.2 },
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 4 },
            }}
            className="gallery-swiper"
          >
            {galleryItems.map((item, index) => (
              <SwiperSlide
                key={`${item.src}-${index}`}
                className="gallery-slide h-auto!"
              >
                <button
                  type="button"
                  onClick={(event) => {
                    openerRef.current = event.currentTarget;
                    setSelectedImage(item);
                  }}
                  className="
                    group
                    relative
                    block
                    h-60
                    w-full
                    overflow-hidden
                    border
                    border-white/10
                    bg-[#0f0f0f]
                    text-left
                    sm:h-90
                    md:h-100
                  "
                >
                  {/* Glow */}
                  <div
                    className="
                      absolute
                      inset-0
                      z-10
                      bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_72%)]
                      opacity-70
                    "
                  />

                  {/* Image */}
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 70vw, 25vw"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                    />
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ampliada: ${selectedImage.alt}`}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/85
            p-4
            backdrop-blur-sm
          "
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="
              relative
              max-h-[90vh]
              w-full
              max-w-5xl
              overflow-hidden
              border
              border-white/10
              bg-[#0a0a09]
              shadow-[0_0_40px_rgba(0,0,0,0.6)]
            "
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              ref={closeButtonRef}
              onClick={() => setSelectedImage(null)}
              className="
                absolute
                right-4
                top-4
                z-10
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/40
                text-lg
                text-white
                transition
                hover:border-khao-gold
                hover:text-khao-gold
              "
              aria-label="Fechar imagem"
            >
              <X size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <div className="relative h-[70vh] w-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
