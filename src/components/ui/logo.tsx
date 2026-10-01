import Image from "next/image";

import { KHAO_ASSETS } from "@/src/config/khao-assets";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src={KHAO_ASSETS.brand.logo}
      alt="KHAO"
      width={160}
      height={160}
      className={className}
    />
  );
}