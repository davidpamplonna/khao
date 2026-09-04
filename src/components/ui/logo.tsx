import Image from "next/image";
import {LOGO_IMG} from '@/src/types/images';

export function Logo() {
  return (
   <>
     <Image src={LOGO_IMG} alt="logo Khao" width={160} height={80} />
   </>
  );
}
