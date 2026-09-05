"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { Logo } from "@/src/components/ui/logo";
import { Navbar } from "@/src/components/layout/navbar";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handledScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handledScroll();

    window.addEventListener("scroll", handledScroll);

    return () => {
      window.removeEventListener("scroll", handledScroll);
    };
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50  ${
        isScrolled ? "bg-black/20 backdrop-blur-md " : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex w-full items-center justify-between px-3 py-5 md:px-10 md:py-7">
        {/* logo */}
        <Link href={"/"} aria-label="KHAO - Início">
          <Logo />
        </Link>
        {/* menu */}
        <Navbar />
      </div>
    </header>
  );
}
