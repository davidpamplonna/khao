"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger, gsap } from "@/src/lib/gsap";
import { SCROLL_LOCK_EVENT } from "./scroll-lock";
import { useReducedMotion } from "./use-reduced-motion";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.6,
      smoothWheel: true,
    });

    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const handleScrollLock = (event: Event) => {
      const locked = (event as CustomEvent<boolean>).detail;

      if (locked) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    window.addEventListener(SCROLL_LOCK_EVENT, handleScrollLock);

    return () => {
      window.removeEventListener(SCROLL_LOCK_EVENT, handleScrollLock);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
