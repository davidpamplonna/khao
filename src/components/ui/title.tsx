import type { HTMLAttributes, ReactNode } from "react";

type TitleProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  eyebrow?: string;
  title: ReactNode;
  highlight?: ReactNode;
  eyebrowClassName?: string;
  titleClassName?: string;
  highlightClassName?: string;
};

export function Title({
  eyebrow,
  title,
  highlight,
  className = "",
  eyebrowClassName = "",
  titleClassName = "",
  highlightClassName = "",
  ...props
}: TitleProps) {
  const wrapperClasses = ["flex flex-col", className].filter(Boolean).join(" ");
  const eyebrowClasses = [
    "text-khao-gold text-xs md:text-sm uppercase khao-description font-medium",
    eyebrowClassName,
  ]
    .filter(Boolean)
    .join(" ");
  const titleClasses = [
    "font-khao-title uppercase text-[clamp(2rem,5vw,4rem)] leading-[0.92]",
    titleClassName,
  ]
    .filter(Boolean)
    .join(" ");
  const highlightClasses = ["text-khao-gold", highlightClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses} {...props}>
      {eyebrow && <span className={eyebrowClasses}>{eyebrow}</span>}

      <h2 className={titleClasses}>
        {title}
        {highlight && <span className={highlightClasses}>{highlight}</span>}
      </h2>
    </div>
  );
}
