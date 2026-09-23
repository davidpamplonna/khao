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
  className,
  eyebrowClassName,
  titleClassName,
  highlightClassName,
  ...props
}: TitleProps) {
  const wrapperClasses = [
    "flex flex-col",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const eyebrowClasses = [
    "font-khao-description text-xs font-medium uppercase tracking-[0.2em] text-khao-gold md:text-sm",
    eyebrowClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const titleClasses = [
    "font-khao-title text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.92]",
    titleClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const highlightClasses = [
    "text-khao-gold",
    highlightClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses} {...props}>
      {eyebrow && (
        <span className={eyebrowClasses}>
          {eyebrow}
        </span>
      )}

      <h2 className={titleClasses}>
        {title}

        {highlight && (
          <span className={highlightClasses}>
            {highlight}
          </span>
        )}
      </h2>
    </div>
  );
}