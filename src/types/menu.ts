export  type MenuDish = {
    id: string;
    number: string;
    name: string;
    description: string;
    image: string;
    alt: string;
}

export type MenuCategory ={
id: string;
number: string;
label: string;
dishes: MenuDish[];
}

