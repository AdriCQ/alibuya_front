import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store';
import { IProduct } from '@/types';
import { ShopStore } from '@/store/Shop';
import { INotification } from '@/types';
import { AuthStore } from './Auth';

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
    type: 'error'
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

  addNotification(_notifications: string[], _type: 'error' | 'info' | 'warning' | 'primary' | 'secondary' = 'error') {
    this.clearNotifications();
    this.notificationPopupContent.type = _type;
    for (const _data in _notifications) {
      if (String(_notifications[_data]).toString().includes("status code 401")) {
        this.notificationPopupContent.content.push('Autenticacion requerida')
        AuthStore.logout();
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