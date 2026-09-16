"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { KHAO_EXPERIENCE } from "@/src/data/image";
import { KHAO_EXPERIENCE_CLIP } from "@/src/data/video";
import { gsap } from "@/src/lib/gsap";

import { Title } from "../ui/title";

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const videoWrapper = videoWrapperRef.current;
    const video = videoRef.current;

    if (!section || !videoWrapper || !video) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const title = section.querySelector<HTMLElement>(
        "[data-experience-title]",
      );

      const ornaments = gsap.utils.toArray<HTMLElement>(
        "[data-experience-ornament]",
      );

      // RESPONSIVE MOTION

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const { desktop, mobile } = context.conditions as {
            desktop: boolean;
            mobile: boolean;
          };

          // INITIAL STATE

          gsap.set(videoWrapper, {
            scaleX: desktop ? 0.64 : 0.88,
            scaleY: desktop ? 0.52 : 0.72,
            transformOrigin: "center center",
          });

          gsap.set(video, {
            scale: desktop ? 1.12 : 1.08,
            transformOrigin: "center center",
          });

          gsap.set(title, {
            autoAlpha: 0,
            y: 30,
          });

          gsap.set(ornaments, {
            autoAlpha: 0,
            scale: 0.9,
          });

          // INTRO

          const intro = gsap.timeline();

          intro
            .to(title, {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            })
            .to(
              ornaments,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
              },
              "-=0.7",
            );

          // SCROLL TIMELINE

          const experienceTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",

              /*
               * Mobile precisa de menos distância de scroll.
               */

              end: mobile ? "+=90%" : "+=120%",

              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          /*
           * 
           * VIDEO EXPANSION
           * 
           *
           * Desktop:
           *
           * 64% → 100%
           * 52vh → 100vh
           *
           * Mobile:
           *
           * 88% → 100%
           * 72% → 100%
           *
           * Porém o próprio wrapper mobile possui somente 58dvh.
           * Portanto o resultado visual nunca ocupa a viewport inteira.
           */

          experienceTimeline.to(
            videoWrapper,
            {
              scaleX: 1,
              scaleY: mobile ? 1 : 1,
              ease: "none",
            },
            0,
          );

          // CINEMATIC VIDEO

          experienceTimeline.to(
            video,
            {
              scale: 1,
              ease: "none",
            },
            0,
          );

          // TITLE EXIT

          if (title) {
            experienceTimeline.to(
              title,
              {
                autoAlpha: 0,
                y: mobile ? -25 : -40,
                ease: "power2.out",
              },
              0.3,
            );
          }
        },
      );

      return () => media.revert();
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-dvh min-h-screen overflow-hidden bg-khao-bg"
      aria-labelledby="experience-title"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        {/* ORNAMENT TOP */}

        <div
          data-experience-ornament
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-30
          "
        >
          <Image
            src={KHAO_EXPERIENCE.khao_ornament}
            width={130}
            height={130}
            alt=""
            priority
            className="h-auto w-24 sm:w-28 md:w-32"
          />
        </div>

        {/* TITLE */}

        <div
          id="experience-title"
          data-experience-title
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[8%]
            z-20
            w-[94%]
            -translate-x-1/2
            text-center
            md:top-[9%]
            md:w-[90%]
          "
        >
          <Title title="Uma experiência feita para ser" highlight="sentida." />
        </div>

        {/* VIDEO */}

        <div
          ref={videoWrapperRef}
          className="
            relative
            h-[58dvh]
            w-screen
            overflow-hidden
            will-change-transform
            md:h-screen
          "
        >
          <video
            ref={videoRef}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              will-change-transform
            "
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={KHAO_EXPERIENCE_CLIP} type="video/mp4" />
          </video>

          {/* Cinematic overlay */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-khao-black/10
            "
          />
        </div>

        {/*ORNAMENT BUTTOM */}

        <div
          data-experience-ornament
          className="
            pointer-events-none
            absolute
            bottom-0
            right-0
            z-30
            rotate-180
          "
        >
          <Image
            src={KHAO_EXPERIENCE.khao_ornament}
            width={130}
            height={130}
            alt=""
            className="h-auto w-24 sm:w-28 md:w-32"
          />
        </div>
      </div>
    </section>
  );
}
