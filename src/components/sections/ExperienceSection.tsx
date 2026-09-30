"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { KHAO_EXPERIENCE } from "@/src/data/assets/image";
import { KHAO_EXPERIENCE_CLIP } from "@/src/data/assets/video";
import { gsap } from "@/src/lib/gsap";
import { useReducedMotion } from "@/src/motion/use-reduced-motion";

import { Title } from "../ui/title";

const EXPERIENCE_TITLE = "Uma experiência feita para ser sentida.";

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const videoWrapper = videoWrapperRef.current;
    const video = videoRef.current;

    if (!section || !videoWrapper || !video || reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      /*
       * ELEMENTOS
       */

      const title = section.querySelector<HTMLElement>(
        "[data-experience-title]",
      );

      const titleWords = gsap.utils.toArray<HTMLElement>(
        "[data-experience-word]",
      );

      const ornaments = gsap.utils.toArray<HTMLElement>(
        "[data-experience-ornament]",
      );

      /*
       * RESPONSIVE MOTION
       */

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

          /*
           * INITIAL STATE
           */

          gsap.set(videoWrapper, {
            scaleX: desktop ? 0.64 : 0.88,
            scaleY: desktop ? 0.52 : 0.72,
            transformOrigin: "center center",
          });

          gsap.set(video, {
            scale: desktop ? 1.12 : 1.08,
            transformOrigin: "center center",
          });

          /*
           * TITLE
           */

          gsap.set(titleWords, {
            autoAlpha: 0.08,
            y: mobile ? 14 : 20,
            willChange: "transform, opacity",
          });

          /*
           * ORNAMENTOS
           */

          gsap.set(ornaments, {
            autoAlpha: 0,
            scale: 0.9,
            willChange: "transform, opacity",
          });

          /*
           * INTRO
           *
           * Os ornamentos entram normalmente.
           *
           * O título agora é controlado pelo scroll,
           * seguindo o mesmo comportamento da EssenceSection.
           */

          const intro = gsap.timeline();

          intro.to(ornaments, {
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          });

          /*
           * TITLE SCROLL REVEAL
           *
           * Cada palavra ganha vida conforme
           * o usuário entra na seção.
           */

          if (titleWords.length) {
            gsap.to(titleWords, {
              autoAlpha: 1,
              y: 0,
              stagger: 0.1,
              ease: "none",

              scrollTrigger: {
                trigger: title,
                start: "top 78%",
                toggleActions: "play none none none",
                once: true,
              },
            });
          }

          /*
           * SCROLL TIMELINE
           *
           * A seção continua funcionando como uma
           * experiência pinada.
           */

          const experienceTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",

              /*
               * Mobile precisa de menos distância.
               */

              end: mobile ? "+=90%" : "+=120%",

              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          /*
           * VIDEO EXPANSION
           */

          experienceTimeline.to(
            videoWrapper,
            {
              scaleX: 1,
              scaleY: 1,
              ease: "none",
            },
            0,
          );

          /*
           * CINEMATIC VIDEO
           */

          experienceTimeline.to(
            video,
            {
              scale: 1,
              ease: "none",
            },
            0,
          );

          /*
           * TITLE EXIT
           *
           * Depois de aparecer, o título começa
           * a sair enquanto o vídeo ocupa a tela.
           */

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
  }, [reducedMotion]);

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      className="relative h-dvh min-h-screen overflow-hidden bg-khao-surface"
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
          <div className="mx-auto w-230 max-w-7xl">

            <Title 
            title={
              <>
                UMA EXPERIÊNCIA FEITA PARA SER {''} 
                <span className="text-khao-gold">SENTIDA</span>
                .
              </>
            }
            className="text-khao-black text-[clamp(2rem,5vw,4rem)]"
            />
          </div>
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
            autoPlay={!reducedMotion}
            loop
            muted
            playsInline
            preload="none"
            poster={KHAO_EXPERIENCE.poster}
            aria-hidden="true"
          >
            <source src={KHAO_EXPERIENCE_CLIP} type="video/mp4" />
          </video>

          {/* CINEMATIC OVERLAY */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-khao-black/10
            "
          />
        </div>

        {/* ORNAMENT BOTTOM */}

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
