import Link from "next/link";
import { MoveRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "default" | "primary";
  href?: string;
};
export function Button({
  children,
  variant = "default",
  className = "",
  type = "button",
  href,
  ...props
}: ButtonProps) {
  const variants = {
    default: {
      wrapper:
        "border-[var(--color-khao-white)]/30 text-[var(--color-khao-white)] hover:border-[var(--color-khao-white)]",
      fill: "bg-[var(--color-khao-white)]",
      text: "group-hover:text-[var(--color-khao-black)]",
      icon: "text-[var(--color-khao-white)] group-hover:text-[var(--color-khao-black)]",
    },
    primary: {
      wrapper: "border-none text-[var(--color-khao-white)]",
      fill: "bg-[var(--color-khao-gold)]",
      text: "group-hover:text-[var(--color-khao-black)]",
      icon: "group-hover:text-[var(--color-khao-black)] text-[var(--color-khao-white)]",
    },
  };
  const current = variants[variant];
  const classes = [
    "group relative inline-flex",
    "min-h-12 w-full sm:w-auto sm:min-w-52",
    "items-center justify-center",
    "border bg-transparent px-7 py-4",
    "transition-all duration-700 ease-out",
    "focus:outline-none focus-visible:ring-1",
    "focus-visible:ring-[var(--color-khao-gold)]/70",
    "disabled:pointer-events-none disabled:opacity-40",
    current.wrapper,
    className,
  ].join(" ");
  const content = (
    <>
      {" "}
      {/* Hover fill */}{" "}
      <span
        aria-hidden="true"
        className={[
          "absolute inset-0 origin-left scale-x-0",
          "transition-transform duration-700",
          "ease-[cubic-bezier(0.16,1,0.3,1)]",
          "group-hover:scale-x-100",
          current.fill,
        ].join(" ")}
      />{" "}
      {/* Content */}{" "}
      <span
        className={[
          "relative z-10 flex w-full items-center justify-center gap-5",
          "whitespace-nowrap transition-colors duration-500",
          current.text,
        ].join(" ")}
      >
        {" "}
        <span className="text-[9px] font-medium uppercase tracking-[0.28em] md:text-[10px]">
          {" "}
          {children}{" "}
        </span>{" "}
        <span
          aria-hidden="true"
          className={[
            "shrink-0 text-[15px] leading-none",
            "transition-all duration-700",
            "group-hover:translate-x-1",
            current.icon,
          ].join(" ")}
        >
          {" "}
          <MoveRight size={15} strokeWidth={1} />{" "}
        </span>{" "}
      </span>{" "}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {" "}
        {content}{" "}
      </Link>
    );
  }
  return (
    <button type={type} {...props} className={classes}>
      {" "}
      {content}{" "}
    </button>
  );
}
