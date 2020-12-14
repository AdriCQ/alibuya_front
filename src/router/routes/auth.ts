import { RouteConfig } from 'vue-router';
import AuthLayout from '@/components/layouts/AuthLayout.vue';
import { NoAuthGuard } from '@/router/guards/authGuards';

export const authRoutes: RouteConfig = {
  path: '/auth',
  component: AuthLayout,
  children: [

    {
      path: 'login',
      name: 'auth.login',
      component: () => import("@/views/settings/Auth.vue"),
      meta: {
        title: 'Entrar',
        auth: true
      },
      beforeEnter: NoAuthGuard
    },
    {
      path: 'register',
      name: 'auth.register',
      component: () => import("@/views/settings/Auth.vue"),
      meta: {
        title: 'Registro',
        auth: true
      },
      beforeEnter: NoAuthGuard
    },
    {
      path: 'forgot-password',
      name: 'auth.forgot_password',
      component: () => import("@/views/settings/Auth.vue"),
      meta: {
        title: 'Auth',
        auth: true
      },
      beforeEnter: NoAuthGuard
    },
    {
      path: 'reset-password',
      name: 'auth.reset_password',
      component: () => import("@/views/settings/Auth.vue"),
      meta: {
        title: 'Auth',
        auth: true
      },
      beforeEnter: NoAuthGuard
    },
    // redirect from child
    {
      path: '',
      redirect: { name: 'auth.login' }
    },
  ],
};