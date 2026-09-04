"use client";

import {ReactNode, useEffect} from 'react'
import {gsap, ScrollTrigger} from '../../lib/gsap'
import Lenis from 'lenis';


interface SmoothScrollProps {
    children: ReactNode;
}


export default function SmoothScroll({children}: SmoothScrollProps){

    useEffect(() => {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches

     if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.6,
      smoothWheel: true,
    });

    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);


    return <>{children}</>
}