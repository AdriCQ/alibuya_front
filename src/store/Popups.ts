import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { UserStore, ShopStore } from '@/store';
import { IProduct, TNotificationAction, TRouteLink, INotification, TStatusColor } from '@/types';

@Module({ generateMutationSetters: true })
class PopupModule extends VuexModule {
  // Auth
  auth = false;
  authDefault = 'register';
  // Products
  productPopup = false
  productToShow: IProduct = ShopStore.allProducts[0];
  // Notifications
  notificationPopup = false;
  notificationPopupContent: INotification = {
    content: [],
    type: 'error',
    timeout: 2500,
    action: {
      icon: 'mdi-cart',
      label: 'Ver',
      to: { name: 'shop.cart' }
    }
  };

  closeAll() {
    this.auth = false;
    this.productPopup = false;
  }

  openAuth(type: 'register' | 'login' = 'register') {
    this.authDefault = type;
    this.auth = true;
  }

  showProduct(_prod: IProduct) {
    this.productToShow = _prod;
    this.productPopup = true;
  }

  addNotification(_notifications: string[], _type: TStatusColor = 'error', _timeout = 5000, _to?: TRouteLink, _action?: TNotificationAction) {
    this.clearNotifications();
    this.notificationPopupContent.type = _type;
    this.notificationPopupContent.action = _action;
    this.notificationPopupContent.timeout = _timeout;
    this.notificationPopupContent.to = _to;
    for (const _data in _notifications) {
      if (String(_notifications[_data]).toString().includes("status code 401")) {
        this.notificationPopupContent.content.push('Autenticacion requerida')
        UserStore.logout();
        break;
      }
      else {
        this.notificationPopupContent.content.push(_notifications[_data])
      }
    }
    this.notificationPopup = true;
  }

  clearNotifications() {
    this.notificationPopupContent.content = [];
  }
}

// register module (could be in any file) 
export const PopupStore = new PopupModule({ store, name: 'Popup' });