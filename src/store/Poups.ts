import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store';
import { IProduct } from '@/types';
import { ProductStore } from '@/store/Products';

@Module({ generateMutationSetters: true })
class PopupModule extends VuexModule {
  auth = false;
  authDefault = 'register';
  productPopup = false
  productToShow: IProduct = ProductStore.products[0];

  closeAll() {
    this.auth = false;
    this.productPopup = false;
  }

  openAuth(type: 'register' | 'login' = 'register') {
    this.authDefault = type;
    this.auth = true;
  }
}

// register module (could be in any file) 
export const PopupStore = new PopupModule({ store, name: 'Popup' });