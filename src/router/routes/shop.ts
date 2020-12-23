import { RouteConfig } from 'vue-router';
import BaseLayout from '@/components/layouts/BaseLayout.vue';

export const shopRoutes: RouteConfig = {
  path: '/shop',
  component: BaseLayout,
  children: [
    {
      name: 'shop.home',
      path: '',
      component: () => import('@/views/main/Home.vue'),
      meta: {
        title: 'Tienda'
      }
    },
    {
      name: 'shop.pack',
      path: 'pack',
      component: () => import('@/views/shop/Packs.vue'),
      meta: {
        title: 'Paquetes'
      }
    },
    {
      name: 'shop.pack-details',
      path: 'pack-details',
      component: () => import('@/views/shop/PackDetails.vue'),
      meta: {
        title: 'Paquetes'
      }
    },
    {
      name: 'shop.cart',
      path: 'cart',
      component: () => import('@/views/shop/Cart.vue'),
      meta: {
        title: 'Mi Carrito'
      },
      // beforeEnter: BaseAuthGuard
    },
    {
      name: 'shop.details',
      path: 'details',
      component: () => import('@/views/shop/ProductDetails.vue'),
      meta: {
        title: 'Productos'
      },
      // beforeEnter: BaseAuthGuard
    },
    {
      name: 'shop.checkout',
      path: 'checkout',
      component: () => import('@/views/shop/Checkout.vue'),
      meta: {
        title: 'Checkout'
      },
      // beforeEnter: BaseAuthGuard
    },

    {
      name: 'shop.category',
      path: 'category',
      component: () => import('@/views/shop/Category.vue'),
      meta: {
        title: 'Tienda'
      }
    },
    {
      name: 'shop.type',
      path: 'type',
      component: () => import('@/views/shop/Type.vue'),
      meta: {
        title: 'Tienda'
      }
    },
  ],
};