import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store';
import { IProduct } from '@/types';
import { ShopStore } from '@/store/Shop';

@Module({ generateMutationSetters: true })
class PopupModule extends VuexModule {
  auth = false;
  authDefault = 'register';
  productPopup = false
  productToShow: IProduct = ShopStore.allProducts[0];

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
}

// register module (could be in any file) 
export const PopupStore = new PopupModule({ store, name: 'Popup' });