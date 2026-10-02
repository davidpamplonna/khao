"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { KHAO_ASSETS, KHAO_VIDEOS } from "@/src/config/khao-assets";
import { MENU_CATEGORIES } from "@/src/data/menu";
import { gsap } from "@/src/lib/gsap";
import { setScrollLocked } from "@/src/motion/scroll-lock";
import type { MenuDish } from "@/src/types/menu";

type CategoryId = (typeof MENU_CATEGORIES)[number]["id"];

type MenuItem = MenuDish & {
  price?: string;
};

type MenuModalProps = {
  category: CategoryId;
  items: readonly MenuItem[];
  reducedMotion: boolean;
  onClose: () => void;
};

type MenuNavigationState = {
  activeIndex: number;
  visitedIndices: number[];
};

export function MenuModal({
  category,
  items,
  reducedMotion,
  onClose,
}: MenuModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const hasCenteredCardRef = useRef(false);
  const previousActiveIndexRef = useRef<number | null>(null);
  const pointerOriginRef = useRef<{ x: number; y: number } | null>(null);
  const pointerPositionRef = useRef<{ x: number; y: number } | null>(null);
  const draggedRef = useRef(false);

  const [navigation, setNavigation] = useState<MenuNavigationState>({
    activeIndex: 0,
    visitedIndices: [0],
  });
  const { activeIndex, visitedIndices } = navigation;

  const categoryLabel =
    MENU_CATEGORIES.find((item) => item.id === category)?.label ?? "MENU";

  const goTo = useCallback(
    (index: number) => {
      setNavigation((current) => {
        const nextIndex = Math.max(0, Math.min(items.length - 1, index));
        if (nextIndex === current.activeIndex) return current;

        return {
          activeIndex: nextIndex,
          visitedIndices: !current.visitedIndices.includes(nextIndex)
            ? [...current.visitedIndices, nextIndex]
            : current.visitedIndices,
        };
      });
    },
    [items.length],
  );

  const goNext = useCallback(() => {
    setNavigation((current) => {
      const nextIndex = Math.min(items.length - 1, current.activeIndex + 1);
      if (nextIndex === current.activeIndex) return current;

      return {
        activeIndex: nextIndex,
        visitedIndices: !current.visitedIndices.includes(nextIndex)
          ? [...current.visitedIndices, nextIndex]
          : current.visitedIndices,
      };
    });
  }, [items.length]);

  const goPrevious = useCallback(() => {
    setNavigation((current) => ({
      ...current,
      activeIndex: Math.max(0, current.activeIndex - 1),
    }));
  }, []);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    const originalRootOverflow = document.documentElement.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    setScrollLocked(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalRootOverflow;
      setScrollLocked(false);
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [goNext, goPrevious, onClose]);

  useLayoutEffect(() => {
    const modal = modalRef.current;
    const backdrop = backdropRef.current;
    const content = contentRef.current;

    if (!modal || !backdrop || !content || reducedMotion) return;

    const context = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          backdrop,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
        )
        .fromTo(
          content,
          { autoAlpha: 0, y: 50, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.2",
        );
    }, modal);

    return () => context.revert();
  }, [reducedMotion]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(
      track.querySelectorAll<HTMLElement>("[data-menu-modal-card]"),
    );
    if (!cards.length) return;

    const previousIndex = previousActiveIndexRef.current;
    previousActiveIndexRef.current = activeIndex;

    const tweens: ReturnType<typeof gsap.to>[] = [];

    cards.forEach((card, index) => {
      const distance = Math.abs(index - activeIndex);

      const targetState = {
        autoAlpha: distance === 0 ? 1 : distance === 1 ? 0.5 : 0,
        scale: distance === 0 ? 1 : distance === 1 ? 0.62 : 0.46,
        rotateY: index < activeIndex ? 8 : index > activeIndex ? -8 : 0,
        y: 0,
        zIndex: distance === 0 ? 2 : 1,
        pointerEvents: distance <= 1 ? ("auto" as const) : ("none" as const),
      };

      if (reducedMotion) {
        gsap.set(card, { ...targetState, rotateY: 0 });
        return;
      }

      if (previousIndex === null) {
        gsap.set(card, targetState);
        return;
      }

      tweens.push(
        gsap.to(card, {
          ...targetState,
          duration: 0.85,
          ease: "power3.out",
          overwrite: true,
        }),
      );
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, [activeIndex, reducedMotion, visitedIndices]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = track?.parentElement;
    if (!track || !viewport) return;

    let tween: ReturnType<typeof gsap.to> | undefined;

    const centerActiveCard = () => {
      const cards = Array.from(
        track.querySelectorAll<HTMLElement>("[data-menu-modal-card]"),
      );
      const card = cards[activeIndex];
      if (!card) return;

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const focusPoint = viewport.clientWidth / 2;
      const targetX = -(cardCenter - focusPoint);
      const minX = viewport.clientWidth - track.scrollWidth;
      const x = Math.max(minX, Math.min(0, targetX));

      if (reducedMotion || !hasCenteredCardRef.current) {
        gsap.set(track, { x });
        hasCenteredCardRef.current = true;
        return;
      }

      tween?.kill();
      tween = gsap.to(track, {
        x,
        duration: 0.95,
        ease: "power3.out",
        overwrite: true,
      });
    };

    centerActiveCard();
    const resizeObserver = new ResizeObserver(centerActiveCard);
    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
      tween?.kill();
    };
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    let accumulatedDelta = 0;
    let resetTimer: number | null = null;
    let cooldownTimer: number | null = null;

    const handleWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      if (delta === 0) return;

      event.preventDefault();
      if (cooldownTimer !== null) return;

      accumulatedDelta += delta;
      if (resetTimer !== null) window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        accumulatedDelta = 0;
      }, 120);

      if (Math.abs(accumulatedDelta) < 70) return;

      if (accumulatedDelta > 0) goNext();
      else goPrevious();

      accumulatedDelta = 0;
      cooldownTimer = window.setTimeout(() => {
        cooldownTimer = null;
      }, 950);
    };

    modal.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      modal.removeEventListener("wheel", handleWheel);
      if (resetTimer !== null) window.clearTimeout(resetTimer);
      if (cooldownTimer !== null) window.clearTimeout(cooldownTimer);
    };
  }, [goNext, goPrevious]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerOriginRef.current = { x: event.clientX, y: event.clientY };
    pointerPositionRef.current = { x: event.clientX, y: event.clientY };
    draggedRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerOriginRef.current) return;
    pointerPositionRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const origin = pointerOriginRef.current;
    const position = pointerPositionRef.current;

    if (!origin || !position) return;

    const deltaX = origin.x - position.x;
    const deltaY = origin.y - position.y;
    const threshold = 48;

    if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) > threshold) {
      draggedRef.current = true;

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY > 0) goNext();
        else goPrevious();
      } else if (deltaX > 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    pointerOriginRef.current = null;
    pointerPositionRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (draggedRef.current) {
      window.setTimeout(() => {
        draggedRef.current = false;
      }, 0);
    }
  };

  const handlePointerCancel = () => {
    pointerOriginRef.current = null;
    pointerPositionRef.current = null;
    draggedRef.current = false;
  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-modal-title"
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      className="fixed inset-0 z-100 overflow-hidden overscroll-none"
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-khao-black"
        onClick={onClose}
      >
        <video
          src={KHAO_VIDEOS.menu[category]}
          poster={KHAO_ASSETS.hero.poster_chef}
          autoPlay={!reducedMotion}
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="pointer-events-none absolute size-full object-cover object-[center_42%] md:translate-x-[-20vw] md:scale-[1.25]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,7,0.28)_0%,rgba(8,8,7,0.42)_34%,rgba(8,8,7,0.72)_58%,rgba(8,8,7,0.88)_100%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[64vw] border-l border-khao-white/5 bg-khao-black/25 backdrop-blur-lg md:block" />
        <div className="absolute inset-0 bg-khao-black/25 backdrop-blur-sm md:hidden" />
      </div>

      <div
        ref={contentRef}
        className="absolute inset-0 z-10"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="menu-modal-title" className="sr-only">
          {categoryLabel}
        </h2>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="absolute right-5 top-5 z-40 grid size-10 place-items-center rounded-full border border-khao-gold/70 text-khao-white transition-colors duration-300 hover:bg-khao-gold hover:text-khao-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khao-gold sm:right-8 sm:top-7 lg:right-10 lg:top-7"
        >
          <X size={19} strokeWidth={1.3} />
        </button>

        <p
          aria-live="polite"
          className="absolute right-[8vw] top-[12vh] z-20 font-khao-title text-3xl text-khao-white/75 md:right-[8vw] md:top-[12vh] md:text-4xl"
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </p>

        <main className="absolute inset-0 flex items-center overflow-hidden md:left-auto md:right-0 md:w-[64vw]">
          <div
            className="h-full w-full overflow-hidden touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div
              ref={trackRef}
              className="flex h-full w-max items-center gap-[6vw] px-[9vw] md:gap-[4vw] md:px-[calc((64vw-clamp(17rem,36vw,31rem))/2)]"
            >
              {items.map((item, index) => (
                <article
                  key={item.id}
                  data-menu-modal-card
                  aria-hidden={!visitedIndices.includes(index)}
                  className="relative w-[82vw] shrink-0 select-none md:w-[clamp(17rem,36vw,31rem)]"
                  onClick={() => {
                    if (draggedRef.current) {
                      draggedRef.current = false;
                      return;
                    }
                    goTo(index);
                  }}
                >
                  <div className="relative aspect-[1.45] w-full">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      quality={75}
                      priority={index === activeIndex}
                      sizes="(max-width: 767px) 82vw, (max-width: 1280px) 36vw, 31rem"
                      className="pointer-events-none object-contain"
                      draggable={false}
                    />
                  </div>

                  <div className="mx-auto max-w-xl pt-1 text-center sm:pt-3">
                    <h3 className="font-khao-title text-[clamp(2rem,4.2vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[0.16em] text-khao-gold">
                      {item.name}
                    </h3>
                    <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed tracking-wide text-khao-white/85 sm:mt-5 sm:text-base md:text-lg">
                      {item.description}
                    </p>
                    {item.price && (
                      <span className="sr-only">Preço: {item.price}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>

        <nav
          aria-label="Navegação dos pratos"
          className="absolute bottom-[4vh] left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 md:left-[68vw]"
        >
          <button
            type="button"
            onClick={goPrevious}
            disabled={activeIndex === 0}
            aria-label="Prato anterior"
            className="grid size-12 place-items-center rounded-full border border-khao-white/75 text-khao-white transition-colors duration-300 hover:border-khao-gold hover:bg-khao-gold hover:text-khao-black disabled:pointer-events-none disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khao-gold sm:size-[3.25rem]"
          >
            <ArrowLeft size={21} strokeWidth={1.3} />
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex === items.length - 1}
            aria-label="Próximo prato"
            className="grid size-12 place-items-center rounded-full bg-khao-white text-khao-black transition-colors duration-300 hover:bg-khao-gold disabled:pointer-events-none disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khao-gold sm:size-[3.25rem]"
          >
            <ArrowRight size={21} strokeWidth={1.3} />
          </button>
        </nav>
      </div>
    </div>
  );
}
