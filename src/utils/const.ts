import { ILinkIconLabel, IDictionary, IProductCategory } from '@/types';

export const LANG = [
  { label: 'Español', flag: 'images/flags/es.png', tag: 'es' },
  { label: 'English', flag: 'images/flags/en.png', tag: 'en' },
  // { label: 'Detush', flag: 'images/flags/de.png', tag: 'de' },
  // { label: 'Detush', flag: 'images/flags/cn.png', tag: 'cn' },
  // { label: 'Fran', flag: 'images/flags/fr.png', tag: 'fr' },
  // { label: 'Fran', flag: 'images/flags/hu.png', tag: 'hu' },
];

export const CATEGORIES: IDictionary<IProductCategory> = {
  clothes: {
    id: 1,
    types: [],
    icon: 'mdi-hanger',
    labelLang: { es: 'Ropas' },
    to: {
      name: 'shop.pack',
      params: { tag: 'clothes' }
    }
  },

  home: {
    id: 2,
    types: [],
    icon: 'mdi-home',
    labelLang: { es: 'Hogar' },
    to: {
      name: 'shop.tags',
      params: { tag: 'home' }
    }
  },

  pets: {
    id: 3,
    types: [],
    icon: 'mdi-medical-bag',
    labelLang: { es: 'Mascotas' }, to: {
      name: 'shop.tags',
      params: { tag: 'pets' }
    }
  },

  health: {
    id: 4,
    types: [],
    icon: 'mdi-medical-bag',
    labelLang: { es: 'Salud' }, to: {
      name: 'shop.tags',
      params: { tag: 'health' }
    }
  },

  ferreo: {
    id: 4,
    types: [],
    icon: 'mdi-medical-bag',
    labelLang: { es: 'Ferretería' }, to: {
      name: 'shop.tags',
      params: { tag: 'ferreo' }
    }
  },
  automotriz: {
    id: 5,
    types: [],
    icon: 'mdi-car',
    labelLang: { es: 'Automotriz' },
    to: {
      name: 'shop.tags',
      params: { tag: 'automotriz' }
    }
  },
  cell: {
    id: 6,
    types: [],
    icon: 'mdi-cellphone-android',
    labelLang: { es: 'Celulares' },
    to: {
      name: 'shop.tags',
      params: { tag: 'cell' }
    }
  },
  kids: {
    id: 7,
    types: [],
    icon: 'mdi-human-child',
    labelLang: { es: 'Niños' },
    to: {
      name: 'shop.tags',
      params: { tag: 'kids' }
    }
  },
}

const _dep = {
  all: {
    icon: 'mdi-hanger',
    labelLang: { es: 'Todos' },
    to: {
      name: 'shop.home',
    }
  },
  ...CATEGORIES,
};
export const CATEGORIES_PLUS = _dep;

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