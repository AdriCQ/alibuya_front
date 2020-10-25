import { ILinkIconLabel, Dictionary } from '@/types';

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

export const DEPARTMENTS: Dictionary<ILinkIconLabelModified> = {
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
      name: 'shop.pack',
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
  child: {
    icon: 'mdi-human-child',
    labelLang: { es: 'Niños' },
    to: {
      name: 'shop.tags',
      params: { tag: 'child' }
    }
  },
  health: {
    icon: 'mdi-medical-bag',
    labelLang: { es: 'Salud' }, to: {
      name: 'shop.tags',
      params: { tag: 'health' }
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
    label: "Rastrear Pedido",
  },
  {
    icon: "mdi-account-circle",
    label: "Atención al Cliente",
    to: { name: "main.contact" },
  },
];