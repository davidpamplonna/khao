import { Combo } from '@/src/types/combos';
import { KHAO_COMBOS } from "@/src/data/assets/image";


export const combos: Combo[] = [
  {
    id: 'khao-essencial',
    title: 'KHAO ESSENCIAL',
    description: 'A essência da Tailândia, em uma experiência completa.',
    items: ['ENTRADA', 'PRINCIPAL', 'BEBIDA'],
    // cta: {
    //   texto: 'EXPERIMENTAR O ESSENCIAL',
    //   link: '#essencial',
    // },
    image: KHAO_COMBOS.assencial,
    alt: 'khao essencial'
    // itensSugeridos: {
    //   entrada: 'Rolinhos primavera com molho agridoce',
    //   principal: 'Pad Thai de camarão grelhado com amendoim, broto de feijão e limão',
    //   bebida: 'Thai iced tea',
    // },
  },
  {
    id: 'khao-signature',
    title: 'KHAO SIGNATURE',
    description: 'Para quem quer ir além do primeiro sabor.',
    items: ['ENTRADA', 'PRINCIPAL', 'ESPECIAL', 'SOBREMESA'],
    // cta: {
    //   texto: 'EXPERIMENTAR O SIGNATURE',
    //   link: '#signature',
    // },
    image: KHAO_COMBOS.signature,
    alt: 'khao signature',
    // itensSugeridos: {
    //   entrada: 'Tom Yum de camarão com folhas de limão kaffir',
    //   principal: 'Arroz com ovo frito, pad kra pao e camarões grelhados',
    //   especial: 'Camarões grelhados na brasa',
    //   sobremesa: 'Sticky rice com manga',
    // },
  },
];