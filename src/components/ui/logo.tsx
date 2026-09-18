import Image from "next/image";
import { KHAO_LOGO } from "@/src/data/assets/image";

export function Logo() {
  return (
    <>
      <Image src={KHAO_LOGO} alt="Logo" width={160} height={160} />
    </>
  );
}
