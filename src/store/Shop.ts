import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { AuthStore } from '@/store';
import { PRODUCTS } from '@/utils/test';
import { IProductCart, IProduct, TPackDestinationPerson } from '@/types';

@Module({ generateMutationSetters: true })
class ShopModule extends VuexModule {

  shoppingCartProducts: IProductCart[] = [];

  productDetails: IProduct | null = null;

  // Packs
  _userDestinataries: TPackDestinationPerson[] = [];

  get allProducts() {
    return PRODUCTS;
  }

  get suggestedProducts() {
    return PRODUCTS;
  }

  get shoppingCartCounter() {
    return this.shoppingCartProducts.length;
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
   */
  removeShoppingCartProduct(key: number) {
    this.shoppingCartProducts.splice(key, 1);
  }

  get userPacks() { return [] }

  get userDestinataries(): TPackDestinationPerson[] {
    if (AuthStore.isLogged) {
      this._userDestinataries.push({
        first_name: AuthStore.profile.first_name,
        last_name: AuthStore.profile.last_name,
        address: AuthStore.profile.address ? AuthStore.profile.address : '',
      })
    }
    return this._userDestinataries;
  }

  /**
   * addUserDestinatary
   * @param dest TPackDestinationPerson
   */
  addUserDestinatary(dest: TPackDestinationPerson) {
    if (dest.first_name !== '' && dest.last_name !== '' && dest.address !== '')
      this._userDestinataries.unshift(dest);
  }
}

// register module (could be in any file) 
export const ShopStore = new ShopModule({ store, name: 'Shop' });