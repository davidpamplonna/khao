"use client";

import { useLayoutEffect, useRef } from "react";

import { KHAO_VIDEOS, KHAO_ASSETS } from "@/src/config/khao-assets";
import { gsap } from "@/src/lib/gsap";
import { useReducedMotion } from "@/src/motion/use-reduced-motion";

import { Title } from "../ui/title";


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
    //   ELEMENTOS

      const title = section.querySelector<HTMLElement>(
        "[data-experience-title]",
      );

      const titleHeading = title?.querySelector<HTMLElement>("h2");

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
            y: mobile ? 20 : 48,
            transformOrigin: "center center",
          });

          gsap.set(video, {
            scale: desktop ? 1.12 : 1.08,
            transformOrigin: "center center",
          });

          // TITLE

          if (titleHeading) {
            gsap.set(titleHeading, {
              autoAlpha: 0.08,
              y: mobile ? 14 : 20,
              willChange: "transform, opacity",
            });
          }

        //  ORNAMENTOS

          gsap.set(ornaments, {
            autoAlpha: 0,
            scale: 0.9,
            willChange: "transform, opacity",
          });

        //  INTRO

          const intro = gsap.timeline();

          intro.to(ornaments, {
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          });

          // TITLE SCROLL REVEAL

          if (titleHeading) {
            gsap.to(titleHeading, {
              autoAlpha: 1,
              y: 0,
              ease: "none",

              scrollTrigger: {
                trigger: title,
                start: "top 78%",
                toggleActions: "play none none none",
                once: true,
              },
            });
          }

          // SCROLL TIMELINE

          const experienceTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",

              // Mobile precisa de menos distância.

              end: mobile ? "+=90%" : "+=120%",

              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // VIDEO EXPANSION

          experienceTimeline.to(
            videoWrapper,
            {
              scaleX: 1,
              scaleY: 1,
              y: 0,
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

          //  TITLE EXIT

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
          <div className=" md:mx-auto md:w-230 md:max-w-7xl">

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
            poster={KHAO_ASSETS.experience.poster_experience}
            aria-hidden="true"
          >
            <source src={KHAO_VIDEOS.experience} type="video/mp4" />
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
      </div>
    </section>
  );
}
