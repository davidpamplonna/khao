import { useEffect, useState } from "react";

type ScrollState = {
  direction: "up" | "down" | null;
  isAtTop: boolean;
};

const DEFAULT_THRESHOLD = 8;

export function useScrollDirection(
  threshold = DEFAULT_THRESHOLD,
): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    direction: null,
    isAtTop: true,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frameId: number | null = null;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY;

      const isAtTop = currentScrollY <= 0;

      if (Math.abs(difference) >= threshold || isAtTop) {
        setScrollState((currentState) => {
          const nextDirection =
            difference > 0
              ? "down"
              : difference < 0
                ? "up"
                : currentState.direction;

          if (
            currentState.direction === nextDirection &&
            currentState.isAtTop === isAtTop
          ) {
            return currentState;
          }

          return {
            direction: nextDirection,
            isAtTop,
          };
        });

        lastScrollY = currentScrollY;
      }

      frameId = null;
    };

    const handleScroll = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [threshold]);

  return scrollState;
}