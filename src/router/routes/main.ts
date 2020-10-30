import { RouteConfig } from 'vue-router';
import BaseLayout from '@/components/layouts/BaseLayout.vue';

export const mainRoutes: RouteConfig = {
  path: '/',
  component: BaseLayout,
  children: [
    {
      name: 'main.home',
      path: '',
      component: () => import('@/views/main/Home.vue'),
      meta: {
        title: 'Inicio'
      }
    },
    {
      name: 'main.contact',
      path: 'contact',
      component: () => import('@/views/main/Contact.vue'),
      meta: {
        title: 'Contacto'
      }
    },
  ],
};