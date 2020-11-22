import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { IProduct, IProductsPack, TCategory, IDictionary } from '@/types';
import { ShopService } from '@/services';

@Module({ generateMutationSetters: true })
class ShopModule extends VuexModule {
  _suggestedProducts: IProduct[] = [];
  _products: IDictionary<IProduct[]> = {};
  _productTypes: string[] = [];

  shoppingCartProducts: IProduct[] = [];
  tempShoppingCartPacks: IProductsPack[] = [];
  shoppingCartPacks: IProductsPack[] = [];

  productDetails: IProduct | null = null;

  get allProducts() {
    return this._products;
  }

  get suggestedProducts() {
    return this._suggestedProducts;
  }

  get shoppingCartCounter() {
    return this.shoppingCartProducts.length;
  }

  get productTypes() {
    return this._productTypes;
  }

  async getSuggestedProducts() {
    try {
      const _resp = (await ShopService.suggested()).data;
      if (_resp.STATUS) {
        this._suggestedProducts = _resp.DATA.data;
      } else {
        const errors: string[] = [];
        for (const _key in _resp.ERRORS as unknown[]) {
          errors.push(_resp.ERRORS[_key]);
        }
        throw errors;
      }
    }
    catch (error) {
      if (Array.isArray(error))
        throw error;
      else
        throw [error]
    }
  }

  /**
   * Get Product by Id
   * @param _productId number
   */
  async getProductById(_productId: number) {
    try {
      const _resp = (await ShopService.getById(_productId)).data;
      if (_resp.STATUS) {
        this.productDetails = _resp.DATA;
      } else {
        const errors: string[] = [];
        for (const _key in _resp.ERRORS as unknown[]) {
          errors.push(_resp.ERRORS[_key]);
        }
        throw errors;
      }
    }
    catch (error) {
      if (Array.isArray(error))
        throw error;
      else
        throw [error]
    }
  }

  /**
   * Get Product by Id
   * @param _productId number
   */
  async getProductsByCategory(_category: TCategory) {
    try {
      const _resp = (await ShopService.getProductsByCategory(_category)).data;
      if (_resp.STATUS) {
        if (!this._products[_category]) {
          this._products[_category] = [];
        }
        this._products[_category] = _resp.DATA.data;
      } else {
        const errors: string[] = [];
        for (const _key in _resp.ERRORS as unknown[]) {
          errors.push(_resp.ERRORS[_key]);
        }
        throw errors;
      }
    }
    catch (error) {
      if (Array.isArray(error))
        throw error;
      else
        throw [error]
    }
  }

  /**
   * Push product to shopgingCartProducts
   * @param prod IProduct
   */
  addShoppingCartProduct(prod: IProduct, _cant = 1) {
    this.shoppingCartProducts.push({
      cant: _cant,
      images: prod.images,
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
      productsPrice += p.price * (p.cant as number);
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