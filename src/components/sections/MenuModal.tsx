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

import { MENU_CATEGORIES } from "@/src/data/menu";
import { gsap } from "@/src/lib/gsap";
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
  isNewCard: boolean;
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
    isNewCard: false,
  });
  const { activeIndex, visitedIndices, isNewCard } = navigation;

  const categoryLabel =
    MENU_CATEGORIES.find((item) => item.id === category)?.label ?? "MENU";

  const goTo = useCallback(
    (index: number) => {
      setNavigation((current) => {
        const nextIndex = Math.max(0, Math.min(items.length - 1, index));
        if (nextIndex === current.activeIndex) return current;

        const isNewCard = !current.visitedIndices.includes(nextIndex);

        return {
          activeIndex: nextIndex,
          visitedIndices: isNewCard
            ? [...current.visitedIndices, nextIndex]
            : current.visitedIndices,
          isNewCard,
        };
      });
    },
    [items.length],
  );

  const goNext = useCallback(() => {
    setNavigation((current) => {
      const nextIndex = Math.min(items.length - 1, current.activeIndex + 1);
      if (nextIndex === current.activeIndex) return current;

      const isNewCard = !current.visitedIndices.includes(nextIndex);

      return {
        activeIndex: nextIndex,
        visitedIndices: isNewCard
          ? [...current.visitedIndices, nextIndex]
          : current.visitedIndices,
        isNewCard,
      };
    });
  }, [items.length]);

  const goPrevious = useCallback(() => {
    setNavigation((current) => ({
      ...current,
      activeIndex: Math.max(0, current.activeIndex - 1),
      isNewCard: false,
    }));
  }, []);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    document.body.style.overflow = "hidden";

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
    const direction =
      previousIndex === null || activeIndex > previousIndex ? 1 : -1;

    previousActiveIndexRef.current = activeIndex;

    const tweens: ReturnType<typeof gsap.to>[] = [];

    cards.forEach((card, index) => {
      const distance = Math.abs(index - activeIndex);

      if (!visitedIndices.includes(index)) {
        gsap.set(card, {
          autoAlpha: 0,
          scale: 1,
          y: 0,
          zIndex: 0,
          pointerEvents: "none",
        });
        return;
      }

      const targetState = {
        autoAlpha: distance === 0 ? 1 : distance === 1 ? 0.68 : 0.32,
        scale: distance === 0 ? 1 : distance === 1 ? 0.88 : 0.76,
        rotateY: index < activeIndex ? 8 : index > activeIndex ? -8 : 0,
        y: 0,
        zIndex: distance === 0 ? 2 : 1,
        pointerEvents: "auto" as const,
      };

      if (reducedMotion) {
        gsap.set(card, { ...targetState, rotateY: 0 });
        return;
      }

      if (index === activeIndex && isNewCard && previousIndex !== null) {
        tweens.push(
          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              y: window.innerHeight * 0.7 * direction,
              scale: 0.9,
              zIndex: 2,
              pointerEvents: "auto",
            },
            { ...targetState, duration: 0.95, ease: "power3.out" },
          ),
        );
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
  }, [activeIndex, isNewCard, reducedMotion, visitedIndices]);

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
      const targetX = -(cardCenter - viewport.clientWidth / 2);
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
      className="fixed inset-0 z-100 overflow-hidden"
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-khao-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        ref={contentRef}
        className="relative z-10 flex h-full w-full flex-col bg-khao-surface"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
          <div>
            <span className="block font-khao-title text-[0.65rem] uppercase tracking-[0.35em] text-khao-gold">
              Menu
            </span>
            <h2
              id="menu-modal-title"
              className="mt-1 font-khao-title text-[clamp(1.5rem,3vw,2.5rem)] font-bold uppercase leading-none text-khao-black"
            >
              {categoryLabel}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-khao-black/15 transition-colors duration-300 hover:border-khao-gold hover:bg-khao-black hover:text-khao-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khao-gold"
          >
            <X size={20} strokeWidth={1.3} />
          </button>
        </header>

        <div className="flex shrink-0 items-center justify-between px-5 sm:px-8 lg:px-12">
          <p className="font-khao-title text-xs uppercase tracking-[0.25em] text-khao-black/45">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </p>

          <div className="flex items-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Ir para ${item.name}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => goTo(index)}
                className="h-1 rounded-full bg-khao-black/15 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khao-gold"
                style={{ width: index === activeIndex ? "2.5rem" : "0.5rem" }}
              >
                <span className="sr-only">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4">
          <button
            type="button"
            onClick={goPrevious}
            disabled={activeIndex === 0}
            aria-label="Prato anterior"
            className="absolute left-3 top-1/2 z-30 hidden -translate-y-1/2 place-items-center rounded-full border border-khao-black/15 bg-khao-surface/90 text-khao-black shadow-xl transition-all duration-300 hover:border-khao-gold hover:bg-khao-black hover:text-khao-white disabled:pointer-events-none disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khao-gold md:grid md:size-12 lg:left-6"
          >
            <ArrowLeft size={19} strokeWidth={1.2} />
          </button>

          <div
            className="h-full w-full overflow-hidden touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div
              ref={trackRef}
              className="flex w-max items-center gap-5 px-[11vw] sm:gap-7 sm:px-[20vw] lg:gap-10 lg:px-[25vw]"
            >
              {items.map((item, index) => (
                <article
                  key={item.id}
                  data-menu-modal-card
                  aria-hidden={!visitedIndices.includes(index)}
                  className="relative w-[min(86vw,38rem,48vh)] select-none sm:w-[min(82vw,42rem,58vh)] lg:w-[min(58vw,74vh)]"
                  onClick={() => {
                    if (draggedRef.current) {
                      draggedRef.current = false;
                      return;
                    }
                    goTo(index);
                  }}
                >
                  <div className="relative aspect-[1.45] w-full overflow-hidden rounded-3xl bg-[#f3efe9] shadow-[0_26px_52px_rgba(19,15,10,0.14)]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      quality={100}
                      priority={index === activeIndex}
                      sizes="(max-width: 639px) 86vw, (max-width: 1023px) 82vw, 74vh"
                      className="pointer-events-none object-contain p-3 sm:p-4"
                      draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-khao-black/50 via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 font-khao-title text-xs uppercase tracking-[0.25em] text-khao-white/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-col items-start justify-between gap-3 pt-4 sm:flex-row sm:items-end sm:gap-5 sm:pt-5">
                    <div>
                      <h3 className="font-khao-title text-[clamp(1.4rem,4vw,2.8rem)] font-bold leading-[0.95] text-khao-black">
                        {item.name}
                      </h3>
                      <p className="mt-2 max-w-sm text-xs leading-relaxed tracking-wide text-khao-black/55 sm:mt-3 sm:text-sm [@media(max-height:500px)]:hidden">
                        {item.description}
                      </p>
                    </div>
                    <span className="shrink-0 font-khao-title text-base font-medium text-khao-gold sm:text-lg">
                      {item.price}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex === items.length - 1}
            aria-label="Próximo prato"
            className="absolute right-3 top-1/2 z-30 hidden -translate-y-1/2 place-items-center rounded-full border border-khao-black/15 bg-khao-surface/90 text-khao-black shadow-xl transition-all duration-300 hover:border-khao-gold hover:bg-khao-black hover:text-khao-white disabled:pointer-events-none disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khao-gold md:grid md:size-12 lg:right-6"
          >
            <ArrowRight size={19} strokeWidth={1.2} />
          </button>
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-5 px-5 pb-6 sm:px-8 sm:pb-8 lg:px-12">
          <span className="hidden text-[0.65rem] uppercase tracking-[0.25em] text-khao-black/40 sm:block">
            Arraste para explorar
          </span>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={goPrevious}
              disabled={activeIndex === 0}
              aria-label="Item anterior"
              className="grid size-10 place-items-center rounded-full border border-khao-black/15 transition-colors duration-300 hover:border-khao-gold disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khao-gold md:hidden"
            >
              <ArrowLeft size={17} strokeWidth={1.2} />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === items.length - 1}
              aria-label="Próximo item"
              className="grid size-10 place-items-center rounded-full border border-khao-black/15 transition-colors duration-300 hover:border-khao-gold disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khao-gold md:hidden"
            >
              <ArrowRight size={17} strokeWidth={1.2} />
            </button>
            <span className="hidden font-khao-title text-xs uppercase tracking-[0.2em] text-khao-black/40 md:block">
              Scroll / Drag
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
