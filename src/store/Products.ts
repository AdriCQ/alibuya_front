import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store';
import { PRODUCTS } from '@/utils/test';

@Module({ generateMutationSetters: true })
class ProductModule extends VuexModule {
  get products() {
    return PRODUCTS;
  }
}

// register module (could be in any file) 
export const ProductStore = new ProductModule({ store, name: 'Product' });