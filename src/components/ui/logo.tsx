import Image from "next/image";
import { KHAO_LOGO } from "@/src/data/image";

export function Logo() {
  return (
    <>
      <Image src={KHAO_LOGO} alt="Logo" width={160} height={160} />
    </>
  );
}
