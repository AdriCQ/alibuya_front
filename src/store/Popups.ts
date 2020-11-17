import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { UserStore } from '@/store';
import { IProduct, TNotificationAction, TRouteLink, INotification, TStatusColor } from '@/types';
import { IUserContact } from '@/types/store/user';

@Module({ generateMutationSetters: true })
class PopupModule extends VuexModule {
  // Auth
  auth = false;
  authDefault = 'register';
  // Products
  productPopup = false;
  productToShow!: IProduct;
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
  // User contact
  contactPopup = false;
  contactToEdit: IUserContact = {
    full_name: '',
    ci: '',
    address: ''
  }

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

  showEditContact(_contact: IUserContact) {
    this.contactToEdit = _contact;
    this.contactPopup = true;
  }
}

// register module (could be in any file) 
export const PopupStore = new PopupModule({ store, name: 'Popup' });