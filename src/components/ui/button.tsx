import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary: "border-[#f3f1ee] bg-[#f3f1ee] text-[#0a0a09] hover:bg-[#e8e2dc]",

  secondary: [
    "border-white bg-[#0a0a09] text-white",

    // Camada dourada
    "before:absolute before:inset-0 before:z-0",
    "before:origin-left before:scale-x-0",
    "before:bg-[#c79a5b]",

    // Transição suave
    "before:transition-transform",
    "before:duration-700",
    "before:ease-[cubic-bezier(0.22,1,0.36,1)]",

    // Borda
    "hover:border-[#c79a5b]",
  ].join(" "),
};

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  href,
  ...props
}: ButtonProps) {
  const baseClasses = [
    "group relative inline-flex",
    "min-h-[8.5rem] w-full max-w-[38rem]",
    "items-center justify-between gap-4",
    "overflow-hidden",
    "px-7 py-5",
    "text-left align-middle",

    "rounded-none border-2",
    "text-[clamp(1.5rem,2vw,3rem)]",
    "font-semibold uppercase",
    "tracking-[0.08em]",
    "leading-none",

    // Transição geral
    "transition-colors duration-500 ease-out",

    // Focus
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[#c79a5b]",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[#0a0a09]",

    variants[variant],
    variant === "secondary" ? "hover:before:scale-x-100" : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span
        className={
          variant === "secondary"
            ? "relative z-10 flex-1 transition-colors duration-500 ease-out group-hover:text-khao-black"
            : "relative z-10 flex-1"
        }
      >
        {children}
      </span>

      <ArrowRight
        size={30}
        aria-hidden="true"
        className={
          variant === "secondary"
            ? [
                "relative z-10 shrink-0",
                "transition-transform duration-500 ease-out",
                "group-hover:translate-x-1 group-hover:text-khao-black",
              ].join(" ")
            : [
                "relative z-10 shrink-0",
                "transition-transform duration-300 ease-out",
                "group-hover:translate-x-1",
              ].join(" ")
        }
      />
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={baseClasses} {...props}>
      {content}
    </button>
  );
}
