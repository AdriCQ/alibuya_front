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
      name: 'auth',params: {path: 'login'}
    })
  } else {
    next();
  }
}

/**
 * Auth Guard
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