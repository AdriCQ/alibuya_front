import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store';

@Module({ generateMutationSetters: true })
class PopupModule extends VuexModule {
  auth = {
    register: false,
    login: false,
  }

  closeAll() {
    this.auth = {
      register: false,
      login: false,
    }
  }
}

// register module (could be in any file) 
export const PopupStore = new PopupModule({ store, name: 'Popup' });