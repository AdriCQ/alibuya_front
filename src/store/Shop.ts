import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store';
import { PRODUCTS } from '@/utils/test';
import { IProductCart, IProduct } from '@/types';

@Module({ generateMutationSetters: true })
class ShopModule extends VuexModule {

  shoppingCartProducts: IProductCart[] = [];

  get allProducts() {
    return PRODUCTS;
  }

  get suggestedProducts() {
    return PRODUCTS;
  }

  /**
   * Push product to shopgingCartProducts
   * @param prod IProduct
   */
  addShoppingCartProduct(prod: IProduct, _cant = 1) {
    this.shoppingCartProducts.push({
      cant: _cant,
      img: prod.img,
      price: prod.price,
      title: prod.title,
      weight: prod.weight,
      description: prod.description
    })
  }

  /**
   * Remove product from shopgingCartProducts
   * @param prod IProduct
   */
  removeProductFromShoppingCart(prod: IProduct) {

  }
}

// register module (could be in any file) 
export const ShopStore = new ShopModule({ store, name: 'Shop' });