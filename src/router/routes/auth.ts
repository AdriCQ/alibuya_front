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
      component: () => import("@/views/auth/Login.vue"),
       meta: {
         title: 'Entrar',
         auth: true
      },
      beforeEnter: NoAuthGuard
    },
    {
      path: 'register',
      name: 'auth.register',
      component: () => import("@/views/auth/Register.vue"),
       meta: {
         title: 'Registro',
         auth: true
      },
       beforeEnter: NoAuthGuard
    },
    // redirect from child
     {
      path: '' ,
      redirect: {name: 'auth.login'}
    },
    {
      path: '/auth/*',
      redirect: {name:'auth.login'}
    }
  ],
 
  

};