import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store';

@Module({ generateMutationSetters: true })
class AppModule extends VuexModule {
  sidebarLeft = false;
  lang: 'es' = "es";
}

// register module (could be in any file) 
export const AppStore = new AppModule({ store, name: 'App' });