import Link from "next/link";
import { Logo } from "@/src/components/ui/logo";
import { Navbar } from "@/src/components/layout/navbar";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-10 z-50 md:top-5">
      <div className="khao-container flex w-full items-center justify-between px-6 py-5 md:px-10 md:py-7">
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
