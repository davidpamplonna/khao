type TitleProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
};

export function Title({
  eyebrow,
  title,
  highlight,
}: TitleProps) {
  return (
    <div>
      {eyebrow && (
        <span className="text-khao-gold text-xs md:text-sm uppercase khao-description font-medium">
          {eyebrow}
        </span>
      )}

      <h2 className="font-khao-title uppercase text-[clamp(2rem,5vw,4rem)]">
        {title}{" "}
        {highlight && (
          <span className="text-khao-gold">
            {highlight}
          </span>
        )}
      </h2>
    </div>
  );
}