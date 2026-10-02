"use client";

import { useLayoutEffect, useMemo, useRef } from "react";

import { KHAO_ASSETS, KHAO_VIDEOS } from "@/src/config/khao-assets";
import { gsap } from "@/src/lib/gsap";
import { useReducedMotion } from "@/src/motion/use-reduced-motion";
import { useScrollReveal } from "@/src/motion/use-scroll-reveal";
import { useVideoVisibility } from "@/src/motion/use-video-visibility";

import { Title } from "../ui/title";

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const reducedMotion = useReducedMotion();

  useVideoVisibility(videoRef, !reducedMotion);

  const revealConfigs = useMemo(
    () => [
      {
        selector: "[data-experience-title] h2",
        trigger: "[data-experience-title]",
        start: "top 78%",
        from: { autoAlpha: 0.08, y: 20 },
        to: { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
      },
    ],
    [],
  );

  useScrollReveal(sectionRef, revealConfigs);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const videoWrapper = videoWrapperRef.current;
    const video = videoRef.current;

    if (!section || !videoWrapper || !video || reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const title = section.querySelector<HTMLElement>(
        "[data-experience-title]",
      );

      const titleHeading = title?.querySelector<HTMLElement>("h2");

      const ornaments = gsap.utils.toArray<HTMLElement>(
        "[data-experience-ornament]",
      );

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          narrow: "(max-width: 380px)",
        },
        (context) => {
          const { desktop, mobile, narrow } = context.conditions as {
            desktop: boolean;
            mobile: boolean;
            narrow: boolean;
          };

          // VIDEO INITIAL STATE

          gsap.set(videoWrapper, {
            scaleX: desktop ? 0.64 : narrow ? 0.92 : 0.9,

            scaleY: desktop ? 0.52 : narrow ? 0.78 : 0.74,

            y: desktop ? 48 : 20,

            transformOrigin: "center center",

            willChange: "transform",
          });

          gsap.set(video, {
            scale: desktop ? 1.12 : 1.06,

            transformOrigin: "center center",

            willChange: "transform",
          });

          // TITLE

          if (titleHeading) {
            gsap.set(titleHeading, {
              autoAlpha: 0.08,
              y: mobile ? 14 : 20,
              willChange: "transform, opacity",
            });
          }

          // ORNAMENTS

          if (ornaments.length) {
            gsap.set(ornaments, {
              autoAlpha: 0,
              scale: 0.9,
              willChange: "transform, opacity",
            });

            gsap.to(ornaments, {
              autoAlpha: 1,
              scale: 1,
              duration: 1,
              stagger: 0.15,
              ease: "power3.out",
            });
          }

          // EXPERIENCE TIMELINE

          const experienceTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",

              end: desktop ? "+=120%" : narrow ? "+=80%" : "+=90%",

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

          // CINEMATIC VIDEO SCALE

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
  }, [reducedMotion]);

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      aria-labelledby="experience-title"
      className="
        relative
        h-dvh
        min-h-150
        overflow-hidden
        bg-khao-surface
        sm:min-h-170
      "
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
            w-[92%]
            -translate-x-1/2
            text-center
            sm:w-[88%]
            md:top-[9%]
            md:w-[90%]
          "
        >
          <div className="mx-auto md:w-230 md:max-w-7xl">
            <Title
              title={
                <>
                  UMA EXPERIÊNCIA FEITA PARA SER{" "}
                  <span className="text-khao-gold">SENTIDA</span>.
                </>
              }
              className="
                text-khao-black
                text-[clamp(1.8rem,8vw,4rem)]
                leading-[0.98]
              "
            />
          </div>
        </div>

        {/* VIDEO */}

        <div
          ref={videoWrapperRef}
          className="
            relative
            h-[54dvh]
            min-h-80
            w-[92vw]
            max-w-none
            overflow-hidden
            rounded-none
            will-change-transform

            sm:h-[60dvh]
            sm:w-[90vw]

            md:h-screen
            md:w-screen
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
              object-[center_center]
              will-change-transform

              max-md:object-[52%_center]
            "
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
            aria-hidden="true"
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
