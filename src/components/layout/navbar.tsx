"use client";

import { NavLinks, SocialLinks } from "@/src/data/assets/menu";
import { KHAO_Menu } from "@/src/data/assets/image";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Logo } from "../ui/logo";
import { X } from "lucide-react";
import Link from "next/link";
import { setScrollLocked } from "@/src/motion/scroll-lock";

export function NavBar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const wasMenuOpen = useRef(false);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = isOpenMenu ? "hidden" : previousOverflow;
    setScrollLocked(isOpenMenu);

    return () => {
      document.body.style.overflow = previousOverflow;
      setScrollLocked(false);
    };
  }, [isOpenMenu]);

  useEffect(() => {
    const menuPanel = menuPanelRef.current;

    if (!isOpenMenu || !menuPanel) {
      if (wasMenuOpen.current) {
        menuButtonRef.current?.focus();
        wasMenuOpen.current = false;
      }
      return;
    }

    wasMenuOpen.current = true;
    closeButtonRef.current?.focus();

    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpenMenu(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = menuPanel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleMenuKeyDown);
    return () => document.removeEventListener("keydown", handleMenuKeyDown);
  }, [isOpenMenu]);

  return (
    <>
      <button
        ref={menuButtonRef}
        aria-expanded={isOpenMenu}
        aria-controls="khao-mobile-menu"
        aria-label="main-menu"
        onClick={() => setIsOpenMenu((isOpenMenu) => !isOpenMenu)}
        className="group flex items-center gap-3"
      >
        <span className="text-khao-white transition-colors group-hover:text-khao-gold">
          Menu
        </span>
        <Image
          src={KHAO_Menu}
          alt="Menu Hamburguer"
          width={30}
          height={30}
          className="khao menu-icon transition-[filter] duration-300"
        />
      </button>
      {isMounted &&
        createPortal(
          <div
            id="khao-mobile-menu"
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal do KHAO"
            aria-hidden={!isOpenMenu}
            inert={!isOpenMenu}
            className={`
            fixed inset-0 z-60 overflow-y-auto md:overflow-hidden bg-khao-black/80 backdrop-blur-md transition-[opacity,visibility] duration-300
                ${isOpenMenu ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"}`}
          >
            {/* buttom close */}
            <div className="container mx-auto flex w-full items-center justify-between px-3 py-7 sm:px-10">
              {/* <Logo /> */}
              <Logo
                className="
       h-auto
          w-40
          max-md:w-65
          max-sm:w-30"
              />
              <button
                ref={closeButtonRef}
                onClick={() => setIsOpenMenu(false)}
                aria-label="Fechar menu"
                type="button"
                className="flex gap-3 items-center text-khao-white transition-colors hover:text-khao-gold"
              >
                Fechar
                <X aria-hidden="true" />
              </button>
            </div>
            {/* conteiner navegation */}
            <div className="container mx-auto flex min-h-[calc(100dvh-100px)] w-full flex-col overflow-hidden px-8 py-8 sm:px-12">
              <div className="grid flex-1 grid-cols-1 md:grid-cols-2 md:gap-12">
                <nav className="flex flex-col justify-center gap-8">
                  <span className="text-khao-gold block uppercase text-xs tracking-[0.4em]">
                    Navegação
                  </span>
                  <ul className="flex flex-col gap-3">
                    {NavLinks.map((link) => (
                      <li key={link.number}>
                        <Link
                          href={link.href}
                          className="group flex items-end gap-5 text-khao-white transition-transform duration-300 hover:translate-x-3"
                          onClick={() => setIsOpenMenu(false)}
                        >
                          <span className="w-8 text-xs tracking-widest text-khao-gold relative bottom-1">
                            {link.number}
                          </span>
                          <span className="text-4xl font-light tracking-wider transition-colors duration-300 group-hover:text-khao-gold md:text-6xl">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                {/* info */}
                <div className="mt-10 flex flex-col justify-center md:items-end">
                  <div className="max-w-sm">
                    <span className="block mb-2 md:mb-6 text-sm uppercase text-khao-gold tracking-[0.4em]">
                      KHAO
                    </span>
                    <p className="text-md font-light leading-relaxed md:text-2xl">
                      Uma experiência gastronômica
                      <br />
                      inspirada nos sabores
                      <br />
                      da Ásia.
                    </p>
                  </div>
                </div>
              </div>
              {/* footer */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-khao-white/10">
                {/* horarios */}
                <div>
                  <span className="text-xs uppercase tracking-[0.3rem] text-khao-gold">
                    Horários
                  </span>
                  <p className="text-sm leading-relaxed text-khao-white/95">
                    Ter — Qui
                    <br />
                    12:00 — 23:00
                  </p>

                  <p className="text-sm leading-relaxed text-khao-white/95">
                    Sex — Sáb
                    <br />
                    12:00 — 00:00
                  </p>
                </div>
                {/* localização */}
                <div>
                  <span className="text-xs uppercase tracking-[0.3rem] text-khao-gold">
                    Localização
                  </span>
                  <p className="text-sm leading-relaxed text-khao-white/95">
                    Av. Exemplo, 123
                    <br />
                    São Paulo — SP
                  </p>
                </div>
                {/* redes sociais */}
                <div className="md:text-right">
                  <span className="text-xs mt-1 block uppercase tracking-[0.3rem] text-khao-gold">
                    Siga o KHAO
                  </span>
                  {SocialLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-5 md:block gap-3 text-sm leading-relaxed text-khao-white/95 hover:text-khao-gold transition-all duration-500 hover:-translate-x-3"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
