import { AuthStore } from '@/store/Auth';
import { NavigationGuard } from 'vue-router';
import { PopupStore } from '@/store/Popups';

/**
 * Auth Guard
 * @param to Route
 * @param from Route
 * @param next 
 */
export const BaseAuthGuard: NavigationGuard = (to, from, next) => {
  if (!AuthStore.isLogged) {
    PopupStore.openAuth('login');
  } else {
    next();
  }
}