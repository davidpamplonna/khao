"use client";

import { useLayoutEffect } from "react";
import type { RefObject } from "react";

import { gsap } from "@/src/lib/gsap";
import { useReducedMotion } from "@/src/motion/use-reduced-motion";

type ScrollTriggerTarget =
  | string
  | HTMLElement
  | null
  | (() => HTMLElement | null);

type ScrollRevealConfig = {
  selector: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: ScrollTriggerTarget;
  start?: string;
  end?: string;
  stagger?: number;
  once?: boolean;
};

function resolveTrigger(
  target: ScrollTriggerTarget | undefined,
  fallback: HTMLElement,
) {
  if (typeof target === "function") {
    return target() ?? fallback;
  }

  return target ?? fallback;
}

export function useScrollReveal(
  rootRef: RefObject<HTMLElement | null>,
  configs: ScrollRevealConfig[],
) {
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || reducedMotion) return;

    const context = gsap.context(() => {
      configs.forEach(
        ({
          selector,
          from = { autoAlpha: 0.15, y: 25 },
          to = { autoAlpha: 1, y: 0, duration: 0.75, ease: "power2.out" },
          trigger,
          start = "top 80%",
          end,
          stagger,
          once = true,
        }) => {
          const elements = gsap.utils.toArray<HTMLElement>(selector);

          if (!elements.length) return;

          gsap.fromTo(elements, from, {
            ...to,
            stagger,
            scrollTrigger: {
              trigger: resolveTrigger(trigger, root),
              start,
              end,
              once,
              toggleActions: "play none none none",
            },
          });
        },
      );
    }, root);

    return () => context.revert();
  }, [configs, reducedMotion, rootRef]);
}
