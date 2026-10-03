"use client";

import Link from "next/link";

import { useScrollDirection } from "@/src/hooks/use-scroll-direction";

import { Logo } from "../ui/logo";
import { NavBar } from "./navbar";

const HEADER_BASE_CLASSES = `
  fixed
  inset-x-0
  top-0
  z-50
  transition-[transform,background-color,backdrop-filter]
  duration-500
  ease-[cubic-bezier(0.22,1,0.36,1)]
`;

const HEADER_VISIBLE_CLASSES = "translate-y-0";

const HEADER_HIDDEN_CLASSES = "-translate-y-full";

const HEADER_SCROLLED_CLASSES = `
  bg-khao-black/5
  backdrop-blur-md
`;

const HEADER_TOP_CLASSES = "bg-transparent backdrop-blur-0";

const HEADER_CONTAINER_CLASSES = `
  container
  mx-auto
  flex
  w-full
  items-center
  justify-between
  px-3
  py-5
  md:px-12
  md:py-5
`;

const LOGO_CLASSES = `
  h-auto
  w-40
  max-md:w-65
  max-sm:w-30
`;

export function Header() {
  const { direction, isAtTop } = useScrollDirection();

  const isVisible = direction !== "down";

  const backgroundClass = isAtTop
    ? HEADER_TOP_CLASSES
    : HEADER_SCROLLED_CLASSES;

  return (
    <header
      className={`
        ${HEADER_BASE_CLASSES}
        ${backgroundClass}
        ${isVisible
          ? HEADER_VISIBLE_CLASSES
          : HEADER_HIDDEN_CLASSES}
      `}
    >
      <div className={HEADER_CONTAINER_CLASSES}>
        <Link
          href="/"
          aria-label="KHAO — início"
        >
          <Logo className={LOGO_CLASSES} />
        </Link>

        <NavBar />
      </div>
    </header>
  );
}