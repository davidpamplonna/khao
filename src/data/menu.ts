import { KHAO_MENU } from "@/src/data/assets/image";

import { MenuCategory } from "@/src/types/menu";

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "starters",
    number: "01",
    label: "ENTRADAS",
    dishes: [
      {
        id: "satay",
        number: "01",
        name: "SATAY",
        description:
          "Frango marinado em especiarias, grelhado lentamente e servido com molho cremoso de amendoim.",
        image: KHAO_MENU.satay,
        alt: "Satay de frango servido com molho de amendoim",
      },
      {
        id: "tom-yum-goong",
        number: "02",
        name: "TOM YUM GOONG",
        description:
          "Camarões, cogumelos e ervas aromáticas em um caldo intenso, cítrico e delicadamente picante.",
        image: KHAO_MENU.tom_yum_goong,
        alt: "Tom Yum Goong com camarões e ervas aromáticas",
      },
      {
        id: "spring-rolls",
        number: "03",
        name: "SPRING ROLLS",
        description:
          "Rolinho crocante de vegetais frescos, ervas tailandesas e molho agridoce da casa.",
        image: KHAO_MENU.spring_rolls,
        alt: "Spring Rolls crocantes com vegetais e ervas",
      },
    ],
  },

  {
    id: "mains",
    number: "02",
    label: "PRINCIPAIS",
    dishes: [
      {
        id: "pad-thai",
        number: "01",
        name: "PAD THAI DE CAMARÃO",
        description:
          "Macarrão de arroz salteado no wok, tamarindo, camarões, brotos frescos e amendoim tostado.",
        image: KHAO_MENU.pad_thai_de_camarao,
        alt: "Pad Thai de camarão servido em prato escuro",
      },
      {
        id: "green-curry",
        number: "02",
        name: "GREEN CURRY",
        description:
          "Curry verde artesanal, leite de coco, frango macio, berinjela tailandesa e ervas frescas.",
        image: KHAO_MENU.green_curry,
        alt: "Green Curry tailandês servido em bowl escuro",
      },
      {
        id: "pad-kra-pao",
        number: "03",
        name: "PAD KRA PAO",
        description:
          "Carne salteada no wok com manjericão tailandês, alho, pimenta e um ovo frito de gema cremosa.",
        image: KHAO_MENU.pad_kra_pao,
        alt: "Pad Kra Pao servido com arroz e ovo frito",
      },
      {
        id: "massaman-curry",
        number: "04",
        name: "MASSAMAN CURRY",
        description:
          "Curry de inspiração sul-asiática com carne lentamente cozida, leite de coco, batatas, especiarias e amendoim.",
        image: KHAO_MENU.massaman_curry,
        alt: "Massaman Curry servido em cerâmica escura",
      },
      {
        id: "khao-pad",
        number: "05",
        name: "KHAO PAD",
        description:
          "Arroz jasmine salteado no wok com camarões, ovo, vegetais frescos e o perfume das ervas tailandesas.",
        image: KHAO_MENU.khao_pad,
        alt: "Khao Pad servido em prato escuro",
      },
    ],
  },

  {
    id: "desserts",
    number: "03",
    label: "SOBREMESAS",
    dishes: [
      {
        id: "mango-sticky-rice",
        number: "01",
        name: "MANGO STICKY RICE",
        description:
          "Arroz glutinoso, manga fresca, leite de coco e sementes de gergelim.",
        image: KHAO_MENU.mango_sticky_rice,
        alt: "Mango Sticky Rice com manga fresca e leite de coco",
      },
      {
        id: "thai-coconut",
        number: "02",
        name: "THAI COCONUT",
        description:
          "Creme delicado de coco, frutas tropicais e crocante de coco tostado.",
        image: KHAO_MENU.thai_coconut,
        alt: "Sobremesa de coco com frutas tropicais",
      },
      {
        id: "khao-chocolate",
        number: "03",
        name: "KHAO CHOCOLATE",
        description:
          "Chocolate intenso, coco tostado e notas aromáticas de especiarias.",
        image: KHAO_MENU.khao_chocolate,
        alt: "Sobremesa de chocolate com coco tostado",
      },
    ],
  },

  {
    id: "drinks",
    number: "04",
    label: "DRINKS",
    dishes: [
      {
        id: "khao-signature",
        number: "01",
        name: "KHAO SIGNATURE",
        description:
          "Cocktail autoral com notas cítricas, ervas aromáticas e especiarias tailandesas.",
        image: KHAO_MENU.khao_signature,
        alt: "Khao Signature servido em copo de cocktail",
      },
      {
        id: "bangkok-mule",
        number: "02",
        name: "BANGKOK MULE",
        description:
          "Uma interpretação contemporânea do Mule com gengibre, cítricos e aromas tropicais.",
        image: KHAO_MENU.bangkok_mule,
        alt: "Bangkok Mule servido em copo de cocktail",
      },
      {
        id: "lemongrass",
        number: "03",
        name: "LEMONGRASS",
        description:
          "Cocktail refrescante de perfil cítrico e aromático inspirado no capim-limão.",
        image: KHAO_MENU.lemongrass,
        alt: "Cocktail Lemongrass com capim-limão",
      },
    ],
  },
];
