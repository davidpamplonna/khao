import { Combo } from "@/src/types/combos";
import { KHAO_COMBOS } from "@/src/data/assets/image";

export const combos: Combo[] = [
  {
    id: "khao-essencial",
    title: "KHAO ESSENCIAL",
    description: "A essência da Tailândia, em uma experiência completa.",
    items: ["ENTRADA", "PRINCIPAL", "BEBIDA"],
    image: KHAO_COMBOS.essencial,
    alt: "Composição do combo KHAO Essencial com entrada, prato principal e bebida",
  },
  {
    id: "khao-signature",
    title: "KHAO SIGNATURE",
    description: "Para quem quer ir além do primeiro sabor.",
    items: ["ENTRADA", "PRINCIPAL", "ESPECIAL", "SOBREMESA"],
    image: KHAO_COMBOS.signature,
    alt: "Composição do combo KHAO Signature com entrada, prato principal, especial e sobremesa",
  },
];
