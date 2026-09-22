import Image from "next/image";

import { KHAO_LOGO } from "@/src/data/assets/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src={KHAO_LOGO}
      alt="KHAO"
      width={160}
      height={160}
      className={className}
    />
  );
}