"use client";

import Link from "next/link";
import { Logo } from "../ui/logo";
import { NavBar } from "./navbar";

import { useState, useEffect } from "react";

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
      className={`fixed inset-x-0 top-0 z-50 ${
        isScrolled ? "bg-black/20 backdrop-blur-md " : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex w-full items-center justify-between px-3 py-5 md:px-10 md:py-7">
        {/* logo */}
        <Link href={"/"}>
          {/* <Logo /> */}
          <Logo
            className="
       h-auto
          w-40
          max-md:w-65
          max-sm:w-30"
          />
        </Link>
        {/* menu */}
        <NavBar />
      </div>
    </header>
  );
}
