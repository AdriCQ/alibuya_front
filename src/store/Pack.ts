import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { IProductsPack, IProductCart } from '@/types';

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
   * Adds product
   * @param _product IProduct
   */
  addProduct(_product: IProductCart) {
    if (_product.weight) {
      // Product more than 1500g
      if (_product.weight > 1500 || this.packs.length === 0) {
        this._packs.push({
          products: [_product],
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
            this._packs[_key].products.push(_product);
            added = true;
            break;
          }
        }
        if (!added) {
          this._packs.push({
            products: [_product],
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
export const PackStore = new PackModule({ store, name: 'Pack' });