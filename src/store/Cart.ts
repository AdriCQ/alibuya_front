import { VuexModule, Module, Action, Mutation } from 'vuex-class-modules';
import store from '@/store/store';
import { IProductsPack, IProductCart, IStorePackParam, IApiResponse } from '@/types';
import { AxiosHelper, ShopService } from '@/services';

@Module({ generateMutationSetters: true })
class CartModule extends VuexModule {
  private _packs: IProductsPack[] = [];
  private _products: IProductCart[] = [];

  /**
   * Gets user packs
   */
  get packs() {
    return this._packs;
  }

  /**
   * Gets total price
   * @returns number
   */
  get totalPrice() {
    let packsPrice = 0;
    this._packs.forEach((pack, packKey) => {
      packsPrice += this.getPackPrice(packKey);
    });
    return packsPrice;
  }

  /**
   * Gets packs counter
   */
  get packsCounter() {
    return this._packs.length;
  }

  /**
   * Products Getters
   */
  get cantProducts() {
    return this._products.length;
  }

  get products() {
    return this._products;
  }


  /**
   * Actions pack module
   * @param _pack IStorePackPAram
   * @returns  Promise
   */
  @Action
  storePack(_pack: IStorePackParam) {
    return new Promise((resolve, reject) => {
      AxiosHelper.callableService(ShopService.storePack(_pack), (_resp: IApiResponse<boolean>) => {
        console.log(_resp);
      }).then(_resp2 => resolve(_resp2)).catch(_error2 => reject(_error2))
    });
  }

  /**
   * Adds product
   * @param _product IProduct
   */
  /*
  addProduct(_product: IProductCart) {
    console.log("Product", _product);
    if (_product.weight) {
      // Product more than 1500g
      if (_product.weight > 1500 || this.packs.length === 0) {
        this._packs.push({
          products: [_product],
          weight: _product.weight,
          cant: 1,
          destinataries: [],
        })
      }
      else {
        let added = false;
        for (const _key in this._packs) {
          const availableWeight = 1500 - this._packs[_key].weight;
          if (availableWeight >= _product.weight) {
            this._packs[_key].weight += _product.weight;
            this._packs[_key].products.push(_product);
            added = true;
            break;
          }
        }
        if (!added) {
          this._packs.push({
            products: [_product],
            weight: _product.weight,
            cant: 1,
            destinataries: [],
          })
        }
      }
    }
  }
  */

  /**
   * Add _product to _products
   * @param _product IProductCart
   */
  // TODO: must change
  @Mutation
  addProduct(_product: IProductCart) {
    this._products.push(_product);
  }

  /**
   * Add ShopingCartPack
   * @param _pack IProductsPack[]
   */
  addShoppingCartPacks(_pack: IProductsPack[]) {
    this._packs.push(..._pack);
  }

  /**
   * Remove pack from shoppingCartPacks
   */
  removeShoppingCartPack(key: number) {
    this._packs.splice(key, 1);
  }

  /**
   * Removes pack product
   * @param _packKey 
   * @param _productKey 
   */
  removePackProduct(_packKey: number, _productKey: number) {
    // if (this.packs[_packKey].products.length > 1)
    this.packs[_packKey].products.splice(_productKey, 1);

  }

  /**
   * Gets pack price
   * @param _packKey 
   * @returns  number
   */
  getPackPrice(_packKey: number) {
    let price = 0;
    if (this.packs[_packKey]) {
      this.packs[_packKey].products.forEach(product => {
        price += product.price * product.cart_cant;
      })
      price = price * this.packs[_packKey].cant
    }
    return price;

  }
}

// register module (could be in any file) 
export const CartStore = new CartModule({ store, name: 'Cart' });