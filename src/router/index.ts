import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { mainRoutes } from './main';
import { shopRoutes } from './shop';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  mainRoutes, shopRoutes
]

const router = new VueRouter({
  routes
})

router.afterEach(() => {
  document.scrollingElement?.scrollTo({
    top: 0,
    behavior: "smooth"
  })
})

export default router
