import { RouteConfig } from 'vue-router';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import { BaseAuthGuard } from '@/router/guards';

export const settingsRoutes: RouteConfig = {
  path: '/settings',
  component: BaseLayout,
  children: [
    {
      name: 'settings.account',
      path: 'account',
      component: () => import('@/views/settings/Account.vue'),
      meta: {
        title: 'Cuenta'
      },
      beforeEnter: BaseAuthGuard
    },
  ],
};