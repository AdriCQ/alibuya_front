import { IProduct } from '@/types';
import { IUserContact } from '@/types/store/user';

export const PRODUCTS: IProduct[] = [
  {
    title: 'Aire-Acondicionado-GPlus',
    img: 'img/alibuya_300x225.png',
    price: 200,
    description: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.']
  },
  {
    title: 'Xiaomi-Redmi-Note-10',
    img: 'img/alibuya_300x225.png',
    price: 300,
    description: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.']
  },
  {
    title: 'Batidora-Licuadora-2-velocidades',
    img: 'img/alibuya_300x225.png',
    price: 60,
    description: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.']
  },
  {
    title: 'Motorina XS7R-Dorada',
    img: 'img/alibuya_300x225.png',
    price: 1600,
    description: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.']
  },
  {
    title: 'Sarten-electrico-Milexus',
    img: 'img/alibuya_300x225.png',
    price: 50,
    description: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.']
  },
  {
    title: 'Samsung-Galaxy-A71',
    img: 'img/alibuya_300x225.png',
    price: 50,
    description: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.']
  },
  {
    title: 'Motorina XS10-GRAY',
    img: 'img/alibuya_300x225.png',
    price: 1200,
    description: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.']
  },
];

const _CLOTHES: IProduct[] = []
for (let i = 1; i <= 100; i++) {
  _CLOTHES.push({
    title: 'Ropa ' + i,
    img: '',
    price: (104 - i),
    description: ['Ropa description'],
    weight: (101 - i) * 10,
  })
}

export const CLOTHES: IProduct[] = _CLOTHES;

export const ALL_USER_CONTACTS: IUserContact[] = [{ 
      full_name: "Darian",
      ci: "01083172380",
      address:
        "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
    },
    {
     
      full_name: "Pedro",
      ci: "01083172380",
      address:
        "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
    },
    {
     
      full_name: "Raquel",
      ci: "01083172380",
      address:
        "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
    },
    {
    
      full_name: "Leo",
      ci: "01083172380",
      address:
        "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
    },
    {
     
      full_name: "Julio",
      ci: "01083172380",
      address:
        "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
    },]