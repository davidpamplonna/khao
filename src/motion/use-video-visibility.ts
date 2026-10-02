"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

export function useVideoVisibility(
  videoRef: RefObject<HTMLVideoElement | null>,
  enabled: boolean,
  sourceKey?: string,
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isVisible = false;

    const syncPlayback = () => {
      if (!enabled || !isVisible || document.visibilityState === "hidden") {
        video.pause();
        return;
      }

      void video.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Não foi possível reproduzir o vídeo visível.", error);
      });
    };

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.1;
              syncPlayback();
            },
            { threshold: 0.1 },
          );

    if (observer) {
      observer.observe(video);
    } else {
      isVisible = true;
    }

    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [enabled, sourceKey, videoRef]);
}
