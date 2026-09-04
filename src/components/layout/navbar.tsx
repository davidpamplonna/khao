"use client";
import { ICONS, LOGO_IMG } from "@/src/types/images";
import Image from "next/image";
import { NavLinks, SocialLinks } from "@/src/types/menu";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <>
      <button
        className="group flex items-center gap-3"
        onClick={() => setIsOpenMenu((isOpenMenu) => !isOpenMenu)}
        aria-expanded={isOpenMenu}
        aria-controls="main-menu"
        type="button"
      >
        <span className="text-khao-white transition-colors group-hover:text-khao-gold">
          Menu
        </span>
        <Image
          src={ICONS.menu}
          alt="Menu Hamburguer"
          width={30}
          height={30}
          className="khao-menu-icon transition-[filter] duration-300"
        />
      </button>

      <div
        className={`
                fixed inset-0 z-50 overflow-y-auto bg-khao-black/80 backdrop-blur-md transition-[opacity,visibility] duration-300
                ${isOpenMenu ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"}`}
      >
        {/* button fechar */}
        <div className="container mx-auto flex w-full items-center justify-between px-5 py-6 sm:px-12 lg:px-20">
          <Image src={LOGO_IMG} alt="Logo Khao" width={160} height={80} />
          <button
            onClick={() => setIsOpenMenu(false)}
            aria-label="Fechar menu"
            type="button"
            className="flex gap-3 items-center text-khao-white transition-colors hover:text-khao-gold"
          >
            Fechar
            <X aria-hidden="true" />
          </button>
        </div>
        {/* conteiner navegacao */}
        <div className="container flex min-h-[calc(100dvh-100px)] w-full flex-col overflow-hidden px-8 py-8 sm:px-12">
          <div className="grid flex-1 grid-cols-1 md:grid-cols-2 md:gap-12">
            <nav className="flex flex-col justify-center gap-8">
              <span className="block text-xs uppercase tracking-[0.4em] text-khao-gold">
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
                      <span className="text-4xl font-light tracking-tight transition-colors duration-300 group-hover:text-khao-gold md:text-6xl">
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
                <span className="block mb-2 md:mb-6 text-sm uppercase tracking-[0.4rem] text-khao-gold">KHAO</span>
                <p className="text-md font-light leading-relaxed  md:text-2xl">
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
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-khao-white/10">
            {/* horários */}
            <div>
                <span className="text-xs uppercase tracking-[0.3rem] text-khao-gold">Horários</span>
                <p className="text-sm leading-relaxed text-khao-white/70">
                       Ter — Qui
                <br />
                12:00 — 23:00
                </p>

                <p className="text-sm leading-relaxed text-khao-white/70">
                    Sex — Sáb
                <br />
                12:00 — 00:00
                </p>
            </div>
            {/* localização */}
            <div>
                <span className="text-xs uppercase tracking-[0.3rem] text-khao-gold">Localização</span>
            <p className="text-sm leading-relaxed text-khao-white/70">
                  Av. Exemplo, 123
                <br />
                São Paulo — SP
            </p>
            </div>
                {/* redes sociais */}
            <div className="md:text-right">
                  <span className="text-xs mt-1 block uppercase tracking-[0.3rem] text-khao-gold">Siga o khao</span>
                {SocialLinks.map((link) => (
                    <Link key={link.href} href={link.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-5 md:block gap-3 text-sm leading-relaxed text-khao-white/70 hover:text-khao-gold transition-all duration-500 hover:-translate-x-3">
                        {link.label}
                    </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
