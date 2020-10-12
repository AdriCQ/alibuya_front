import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { mainRoutes } from './main';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  mainRoutes
]

const router = new VueRouter({
  routes
})

export default router
