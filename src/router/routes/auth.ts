import { RouteConfig } from 'vue-router';
import AuthLayout from '@/components/layouts/AuthLayout.vue';
import { NoAuthGuard } from '@/router/guards/authGuards';

export const authRoutes: RouteConfig = {
  path: '/auth',
  component: AuthLayout,
  children: [
    {
      path: '',
      name: 'auth',
      component: ()=> import('@/views/auth/Auth.vue')
    }
  ],
  beforeEnter: NoAuthGuard,

};