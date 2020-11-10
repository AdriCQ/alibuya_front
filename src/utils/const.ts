import { ILinkIconLabel, IDictionary } from '@/types';

export const LANG = [
  { label: 'Español', flag: 'images/flags/es.png', tag: 'es' },
  { label: 'English', flag: 'images/flags/en.png', tag: 'en' },
  // { label: 'Detush', flag: 'images/flags/de.png', tag: 'de' },
  // { label: 'Detush', flag: 'images/flags/cn.png', tag: 'cn' },
  // { label: 'Fran', flag: 'images/flags/fr.png', tag: 'fr' },
  // { label: 'Fran', flag: 'images/flags/hu.png', tag: 'hu' },
];

interface ILinkIconLabelModified extends ILinkIconLabel {
  labelLang: {
    es?: string;
    en?: string;
  };
}

export const DEPARTMENTS: IDictionary<ILinkIconLabelModified> = {
  all: {
    icon: 'mdi-hanger',
    labelLang: { es: 'Todos' },
    to: {
      name: 'shop.home',
    }
  },
  clothes: {
    icon: 'mdi-hanger',
    labelLang: { es: 'Ropas' },
    to: {
      name: 'shop.pack',
      params: { tag: 'clothes' }
    }
  },
  automotriz: {
    icon: 'mdi-car',
    labelLang: { es: 'Automotriz' },
    to: {
      name: 'shop.tags',
      params: { tag: 'automotriz' }
    }
  },
  cell: {
    icon: 'mdi-cellphone-android',
    labelLang: { es: 'Celulares' },
    to: {
      name: 'shop.tags',
      params: { tag: 'cell' }
    }

  },
  home: {
    icon: 'mdi-home',
    labelLang: { es: 'Hogar' },
    to: {
      name: 'shop.tags',
      params: { tag: 'home' }
    }

  },
  kids: {
    icon: 'mdi-human-child',
    labelLang: { es: 'Niños' },
    to: {
      name: 'shop.tags',
      params: { tag: 'kids' }
    }
  },
  health: {
    icon: 'mdi-medical-bag',
    labelLang: { es: 'Salud' }, to: {
      name: 'shop.tags',
      params: { tag: 'health' }
    }
  },
  pets: {
    icon: 'mdi-medical-bag',
    labelLang: { es: 'Mascotas' }, to: {
      name: 'shop.tags',
      params: { tag: 'pets' }
    }
  }
}

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