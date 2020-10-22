import { RouteConfig } from 'vue-router';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import { BaseAuthGuard } from '@/router/guards';

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
      path: 'pack',
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
      }
    },
    {
      name: 'shop.details',
      path: 'details',
      component: () => import('@/views/shop/ProductDetails.vue'),
      meta: {
        title: 'Productos'
      }
    },

    {
      name: 'shop.checkout',
      path: 'checkout',
      component: () => import('@/views/shop/Checkout.vue'),
      meta: {
        title: 'Checkout'
      },
      beforeEnter: BaseAuthGuard
    },

    {
      name: 'shop.tags',
      path: ':tag',
      component: () => import('@/views/shop/Tag.vue'),
      meta: {
        title: 'Tienda'
      }
    },
  ],
};