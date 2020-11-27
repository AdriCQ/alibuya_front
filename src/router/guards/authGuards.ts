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
      name: 'auth',
      query: {
        redirect: to.fullPath
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
  if (!UserStore.isLogged) {
    next();
  }
  else {
    next(false);
  }
} 