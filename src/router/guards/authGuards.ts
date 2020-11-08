import { UserStore } from '@/store/User';
import { NavigationGuard } from 'vue-router';
import { PopupStore } from '@/store/Popups';

/**
 * Auth Guard
 * @param to Route
 * @param from Route
 * @param next 
 */
export const BaseAuthGuard: NavigationGuard = (to, from, next) => {
  if (!UserStore.isLogged) {
    next({
      path: from.path
    })
    PopupStore.openAuth('login');
  } else {
    next();
  }
}