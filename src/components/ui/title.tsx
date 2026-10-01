import type { ReactNode } from "react";

type TitleProps = {
  title: ReactNode;
  ornament?: ReactNode;
  className?: string;
};

export function Title({
  title,
  ornament,
  className = "",
}: TitleProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {ornament && (
        <div className="flex items-center justify-center gap-6 mb-3">
          <span
            aria-hidden="true"
            className="h-px w-50 bg-linear-to-r from-transparent to-khao-gold/80"
          />

          <span className="font-khao-description text-sm uppercase tracking-[0.2em] text-khao-gold">
            {ornament}
          </span>

          <span
            aria-hidden="true"
            className="h-px w-50 rotate-180 bg-linear-to-r from-transparent to-khao-gold/80"
          />
        </div>
      )}

      <h2 className="font-khao-title uppercase leading-[1.02]">
        {title}
      </h2>
    </div>
  );
}