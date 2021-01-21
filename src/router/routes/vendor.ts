import { RouteConfig } from 'vue-router';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import { BaseAuthGuard } from '@/router/guards';

export const vendorRoutes: RouteConfig = {
  path: '/vendor',
  component: BaseLayout,
   beforeEnter: BaseAuthGuard,
  children: [
    {
      name: 'vendor.home',
      path: 'home',
      meta: {
        title: 'Vendedor',
        requiresAuth: true,
      },
      component: () => import('@/views/main/Home.vue'),
    },
    {
      name: 'vendor.business',
      path: 'business',
      meta: {
        title: 'Vendedor',
        requiresAuth: true,
      },
      component: () => import('@/views/main/Home.vue'),
    },
    {
      name: 'vendor.vendors',
      path: 'vendors',
      meta: {
        title: 'Vendedor',
        requiresAuth: true,
      },
      component: () => import('@/views/main/Home.vue'),
    },
    {
      name: 'vendor.products',
      path: 'products',
      meta: {
        title: 'Vendedor',
        requiresAuth: true,
      },
      component: () => import('@/views/main/Home.vue'),
    },
    {
      name: 'vendor.product.add',
      path: 'product/new',
      meta: {
        title: 'Vendedor',
        requiresAuth: true,
      },
      component: () => import('@/views/main/Home.vue'),
    },
    {
      name: 'vendor.product.edit',
      
      path: 'product/edit',
      meta: {
        title: 'Vendedor',
        requiresAuth: true,
      },
      component: () => import('@/views/main/Home.vue'),
    },

    // redirect from children
    {
      path: '', redirect: {name: 'vendor.home'}
    },
   
  ],
};