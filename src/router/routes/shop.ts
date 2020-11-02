import { RouteConfig } from 'vue-router';
import BaseLayout from '@/components/layouts/BaseLayout.vue';

export const shopRoutes: RouteConfig = {
  path: '/shop',
  component: BaseLayout,
  children: [
    {
      name: 'shop.home',
      path: '',
      component: () => import('@/views/shop/Shop.vue'),
      meta: {
        title: 'Tienda'
      }
    },
    {
      name: 'shop.pack',
      path: 'pack/:tag',
      component: () => import('@/views/shop/PackShop.vue'),
      meta: {
        title: 'Tienda'
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
      name: 'shop.tags',
      path: 'tag/:tag',
      component: () => import('@/views/shop/Tag.vue'),
      meta: {
        title: 'Tienda'
      }
    },
  ],
};