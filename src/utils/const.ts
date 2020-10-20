export const LANG = [
  { label: 'Español', flag: 'images/flags/es.png', tag: 'es' },
  { label: 'English', flag: 'images/flags/en.png', tag: 'en' },
  // { label: 'Detush', flag: 'images/flags/de.png', tag: 'de' },
  // { label: 'Detush', flag: 'images/flags/cn.png', tag: 'cn' },
  // { label: 'Fran', flag: 'images/flags/fr.png', tag: 'fr' },
  // { label: 'Fran', flag: 'images/flags/hu.png', tag: 'hu' },
];

export const DEPARTMENTS = {
  clothes: {
    icon: 'mdi-hanger',
    label: { es: 'Ropas' },
    to: {
      name: 'shop.pack'
    }
  },
  automotriz: {
    icon: 'mdi-car',
    label: { es: 'Automotriz' }
  },
  cell: {
    icon: 'mdi-cellphone-android',
    label: { es: 'Celulares' }

  },
  electronic: {
    icon: 'mdi-lamp',
    label: { es: 'Electrodomésticos' }
  },
  home: {
    icon: 'mdi-home',
    label: { es: 'Hogar' }

  },
  child: {
    icon: 'mdi-human-child',
    label: { es: 'Niños' }
  },
  health: {
    icon: 'mdi-medical-bag',
    label: { es: 'Salud' }

  },
  market: {
    icon: 'mdi-basket',
    label: { es: 'Mercado' }
  }
}