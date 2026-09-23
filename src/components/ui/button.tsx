import Link from "next/link";
import { MoveRight } from "lucide-react";
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

type NativeButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

type LinkButtonProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className"> & {
    href: ComponentPropsWithoutRef<typeof Link>["href"];
  };

export type ButtonProps = NativeButtonProps | LinkButtonProps;

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: {
      wrapper:
        "border-[var(--color-khao-white)] bg-[var(--color-khao-white)] text-[var(--color-khao-black)] hover:border-[var(--color-khao-white)]",
      fill: "bg-[var(--color-khao-white)]",
      text: "text-[var(--color-khao-black)]",
      icon: "text-[var(--color-khao-black)]",
    },
    secondary: {
      wrapper:
        "border-[var(--color-khao-white)]/30 bg-transparent text-[var(--color-khao-white)]",
      fill: "bg-[var(--color-khao-gold)]",
      text: "group-hover:text-[var(--color-khao-black)]",
      icon: "group-hover:text-[var(--color-khao-black)] text-[var(--color-khao-white)]",
    },
  };
  const current = variants[variant];
  const classes = [
    "group relative inline-flex max-w-full",
    "min-h-12 w-full sm:w-auto sm:min-w-52",
    "items-center justify-center",
    "border px-7 py-4",
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
          "relative z-10 flex w-full items-center justify-center gap-3",
          "text-center leading-tight transition-colors duration-500 sm:gap-5",
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
  if ("href" in props) {
    return (
      <Link {...props} className={classes}>
        {" "}
        {content}{" "}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props;

  return (
    <button {...buttonProps} type={type} className={classes}>
      {" "}
      {content}{" "}
    </button>
  );
}
