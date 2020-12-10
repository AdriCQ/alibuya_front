import { ILinkIconLabel } from '@/types';

export const LANG = [
  { label: 'Español', flag: 'images/flags/es.png', tag: 'es' },
  { label: 'English', flag: 'images/flags/en.png', tag: 'en' },
  // { label: 'Detush', flag: 'images/flags/de_x128.png', tag: 'de' },
  // { label: 'Detush', flag: 'images/flags/cn_x128.png', tag: 'cn' },
  // { label: 'Fran', flag: 'images/flags/fr_x128.png', tag: 'fr' },
  // { label: 'Fran', flag: 'images/flags/hu_x128.png', tag: 'hu' },
];

export const WEB_PAGES: ILinkIconLabel[] = [
  {
    icon: "mdi-home",
    label: "Inicio",
    to: {
      name: "main.home",
    },
  },
  {
    icon: "mdi-account-circle",
    label: "Cuenta",
    to: {
      name: "settings.account",
    },
  },
  {
    icon: "mdi-account-circle",
    label: "Pedidos",
    to: { name: "shop.cart" },
  },
  {
    icon: "mdi-account-circle",
    label: "Vender",
    to: { name: "vendor.home" },
  },
  {
    icon: "mdi-account-circle",
    label: "Rastrear Pedido",
    to: {
      name: "main.home",
    },
  },
  {
    icon: "mdi-account-circle",
    label: "Atención al Cliente",
    to: { name: "main.contact" },
  },
];

export const VENDOR_PAGES: ILinkIconLabel[] = [
  {
    icon: "mdi-shopping",
    label: "Tienda",
    to: { name: "vendor.business" },
  },
  {
    icon: "mdi-cart-outline",
    label: "Productos",
    to: { name: "vendor.products" },
  },
  {
    icon: "mdi-chart-bar",
    label: "Estadísticas",
  },
  {
    icon: "mdi-account-multiple",
    label: "Colaboladores",
  },
  {
    icon: "mdi-database",
    label: "Ajustes",
  },
  {
    icon: "mdi-help-circle",
    label: "Ayuda",
  },
];

/*
 * Test
 */
export const productsTest = [
  {
    id: 1,
    title: "Suzuki A1800",
    description: "Lorem ipsum dolor sit ame.",
    image: {
      id: 1,
      paths: {
        xs: "img/test/offers/1.png",
      },
    },
    price: 420,
  },

  {
    id: 2,
    title: "Sandwichera Milexus",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores namea quam unde.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores namea quam unde.",
    image: {
      id: 1,
      paths: {
        xs: "img/test/offers/2.png",
      },
    },
    price: 80,
  },

  {
    id: 3,
    title: "Samsung Galaxy A3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores namea quam unde.",
    image: {
      id: 1,
      paths: {
        xs: "img/test/offers/3.png",
      },
    },
    price: 180,
  },
  {
    id: 4,
    title: "Combo x4 Colgate",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores namea quam unde.",
    image: {
      id: 1,
      paths: {
        xs: "img/test/offers/4.jpg",
      },
    },
    price: 3,
  },

  {
    id: 5,
    title: "Motorina SAM Batería de Litio",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores namea quam unde.",
    image: {
      id: 1,
      paths: {
        xs: "img/test/offers/5.png",
      },
    },
    price: 340,
  },

  {
    id: 6,
    title: "Sartén eléctrico Soyea",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores namea quam unde.",
    image: {
      id: 1,
      paths: {
        xs: "img/test/offers/6.png",
      },
    },
    price: 75,
  },
];