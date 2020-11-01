import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { TLang } from '@/types';
import Storage from '@/utils/Storage';

const storage = new Storage("appStorage");

@Module({ generateMutationSetters: true })
class AppModule extends VuexModule {
  sidebarLeft = false;
  lang: TLang = "es";
  cookieAcceted = false;

  /**
  * Save on localStorage
  */
  storeOnLocalStorage() {
    storage.store({
      lang: this.lang,
      cookieAcceted: this.cookieAcceted,
    });
  }

  /**
   * Load from localStorage
   */
  getFromLocalStorage() {
    const store = storage.get();
    if (store) {
      this.lang = store.lang;
      this.cookieAcceted = store.cookieAcceted;
    }
  }
}
// register module (could be in any file)
export const AppStore = new AppModule({ store, name: 'App' });