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
      // component: () => import('@/views/vendor/NewProduct.vue'),
      component: () => import('@/views/vendor/Home.vue'),
    },
    {
      name: 'vendor.business',
      path: 'business',
      component: () => import('@/views/vendor/Business.vue')
    },
    {
      name: 'vendor.vendors',
      path: 'vendors',
      component: () => import('@/views/vendor/Vendors.vue')
    },
    {
      name: 'vendor.products',
      path: 'products',
      component: () => import('@/views/vendor/Products.vue')
    },
    {
      name: 'vendor.product.add',
      path: 'product/new',
      component: () => import('@/views/vendor/NewProduct.vue')
    },
    {
      name: 'vendor.product.edit',
      path: 'product/edit',
      component: () => import('@/views/vendor/EditProduct.vue')
    },
  ],
};