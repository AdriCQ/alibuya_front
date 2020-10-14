import { RouteConfig } from 'vue-router';
import BaseLayout from '@/components/layouts/BaseLayout.vue';

export const shopRoutes: RouteConfig = {
  path: '/shop',
  component: BaseLayout,
  children: [
    {
      name: 'shop.cart',
      path: '/',
      component: () => import('@/views/shop/Cart.vue'),
    },
  ],
};