import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { PRODUCTS } from '@/utils/test';
import { IProductCart, IProduct, IProductsPack } from '@/types';

@Module({ generateMutationSetters: true })
class ShopModule extends VuexModule {

  shoppingCartProducts: IProductCart[] = [];

  shoppingCartPacks: IProductsPack[] = [];

  productDetails: IProduct | null = null;

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

  /**
   * Add ShopingCartPack
   * @param _pack IProductsPack[]
   */
  addShoppingCartPacks(_pack: IProductsPack[]) {
    this.shoppingCartPacks.push(..._pack);
  }

  /**
   * Remove pack from shoppingCartPacks
   */
  removeShoppingCartPack(key: number) {
    this.shoppingCartPacks.splice(key, 1);
  }

  get userPacks() { return [] }

  /**
   * Extra
   */
  get totalPrice() {
    let productsPrice = 0;
    let packsPrice = 0;
    this.shoppingCartProducts.forEach(p => {
      productsPrice += p.price * p.cant;
    })

    this.shoppingCartPacks.forEach(pack => {
      packsPrice += pack.price * (pack.cant ? pack.cant : 1);
    });
    return productsPrice + packsPrice;
  }

  get packsCounter() {
    return this.shoppingCartPacks.length;
  }

  get productsCounter() {
    return this.shoppingCartProducts.length;
  }

  get countAll() {
    return this.productsCounter + this.packsCounter;
  }

}

// register module (could be in any file) 
export const ShopStore = new ShopModule({ store, name: 'Shop' });