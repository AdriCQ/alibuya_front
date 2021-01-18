import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { mainRoutes, settingsRoutes, shopRoutes, vendorRoutes, authRoutes } from './routes';
import { ScrollTop } from '@/utils/utils';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  mainRoutes, shopRoutes, settingsRoutes, vendorRoutes, authRoutes,
  {
    path: '*',
    redirect: {
      name: 'main.home'
    }
  }
]

const router = new VueRouter({
  routes
});


router.beforeEach((_to, _from, _next) => {
  _to.meta.title ? document.title = "Alibuya | " + _to.meta.title : 'Alibuya';
  ScrollTop();
  _next();
})

// router.afterEach(() => {
//   document.scrollingElement?.scrollTo({
//     top: 0,
//     behavior: "smooth"
//   })
// })

export default router
