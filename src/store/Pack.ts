import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { IProduct, IProductsPack } from '@/types';

@Module({ generateMutationSetters: true })
class PackModule extends VuexModule {
  _packs: IProductsPack[] = [];

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
    let productsPrice = 0;
    let packsPrice = 0;
    this._packs.forEach(p => {
      productsPrice += p.price * (p.cant as number);
    })

    this._packs.forEach(pack => {
      packsPrice += pack.price * (pack.cant ? pack.cant : 1);
    });
    return productsPrice + packsPrice;
  }

  /**
   * Gets packs counter
   */
  get packsCounter() {
    return this._packs.length;
  }

  /**
   * Adds product
   * @param _product IProduct
   */
  addProduct(_product: IProduct) {
    if (_product.weight) {
      // Product more than 1500g
      if (_product.weight > 1500 || this.packs.length === 0) {
        this._packs.push({
          products: [_product],
          price: _product.price as number,
          title: _product.title,
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
            this._packs[_key].price += Number(_product.price);
            this._packs[_key].products.push(_product);
            added = true;
            break;
          }
        }
        if (!added) {
          this._packs.push({
            products: [_product],
            price: Number(_product.price),
            title: _product.title,
            weight: _product.weight,
            cant: 1,
            destinataries: [],
          })
        }
      }
    }
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
}

// register module (could be in any file) 
export const PackStore = new PackModule({ store, name: 'Pack' });