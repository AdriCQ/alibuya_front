import { NavigationGuard } from 'vue-router';
import { UserStore } from '@/store/User';
import { AppStore } from '@/store/App';
/**
 * Auth Guard
 * @param to Route
 * @param from Route
 * @param next 
 */
export const BaseAuthGuard: NavigationGuard = (_to, _from, _next) => {
  if (!UserStore.isLogged) {
    AppStore.redirect = _to;
    _next({
      name: 'auth.login',
    })
  }
  else {
    _next();
  }
}

/**
 * NoAuthGuard
 * @param to Route
 * @param from Route
 * @param next 
 */
export const NoAuthGuard: NavigationGuard = (_to, _from, _next) => {
  if (UserStore.isLogged && _from.meta.auth && _to.meta.auth) {
    if (window.history.length > 2) {
      window.history.go(-2);
      _next(false);
    }
    else _next({ name: 'main.home' });
  }

  else if (!UserStore.isLogged) {
    _next();
  }
  else {
    _next(false);
  }
} 