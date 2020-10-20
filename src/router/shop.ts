import { RouteConfig } from 'vue-router';
import BaseLayout from '@/components/layouts/BaseLayout.vue';

export const shopRoutes: RouteConfig = {
  path: '/shop',
  component: BaseLayout,
  children: [
    {
      name: 'shop.pack',
      path: 'pack',
      component: () => import('@/views/shop/PackShop.vue'),
    },
    {
      name: 'shop.cart',
      path: 'cart',
      component: () => import('@/views/shop/Cart.vue'),
    },
    {
      name: 'shop.details',
      path: 'details',
      component: () => import('@/views/shop/ProductDetails.vue'),
    },
  ],
};