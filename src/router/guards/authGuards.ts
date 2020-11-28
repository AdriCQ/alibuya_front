import { UserStore } from '@/store/User';
import { NavigationGuard } from 'vue-router';

/**
 * Auth Guard
 * @param to Route
 * @param from Route
 * @param next 
 */
export const BaseAuthGuard: NavigationGuard = (to, from, next) => {
  if (!UserStore.isLogged) {
    next({
      name: 'auth.login',
      query: {
        redirect: to.name
      }
    })
  } else {
    next();
  }
}

/**
 * NoAuthGuard
 * @param to Route
 * @param from Route
 * @param next 
 */
export const NoAuthGuard: NavigationGuard = (to, from, next) => {
  if (UserStore.isLogged && from.meta.auth && to.meta.auth) {
    if (window.history.length > 2) {
      window.history.go(-2);
      next(false);
    }
    else next({ name: 'main.home' });
  }

  else if (!UserStore.isLogged) {
    next();
  }
  else {
    next(false);
  }
} 