import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { IProduct, IDictionary, IProductPromotion, ISuggestedParams } from '@/types';
import { ShopService } from '@/services';
import { CATEGORIES } from '@/utils';
@Module({ generateMutationSetters: true })
class ShopModule extends VuexModule {
  _suggestedProducts: IProduct[] = [];
  _products: IDictionary<IProduct[]> = {};
  _productTypes: string[] = [];
  _productsPromotion: IProductPromotion[] | null = null;

  shoppingCartProducts: IProduct[] = [];

  productDetails: IProduct | null = null;

  /**
   * Gets all products
   */
  get allProducts() {
    return this._products;
  }

  /**
   * Gets suggested products
   */
  get suggestedProducts() {
    return this._suggestedProducts;
  }

  /**
   * Gets shopping cart counter
   */
  get shoppingCartCounter() {
    return this.shoppingCartProducts.length;
  }

  /**
   * Gets product types
   */
  get productTypes() {
    return this._productTypes;
  }


  /**
   * Gets products counter
   */
  get productsCounter() {
    return this.shoppingCartProducts.length;
  }

  /**
   * Gets count all
   */
  get countAll() {
    return this.productsCounter;
  }

  /**
   * Gets products promotion
   */
  get productsPromotion() {
    return this._productsPromotion;
  }

  /**
   * Gets suggested products
   */
  async getSuggestedProducts(_params: ISuggestedParams) {
    try {
      const _resp = (await ShopService.suggested(_params)).data;
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
  async getProductsByCategory(_category: string) {
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

  getAllProducts() {
    for (const cat in CATEGORIES) {
      this.getProductsByCategory(cat as string);
    }
  }

}

// register module (could be in any file) 
export const ShopStore = new ShopModule({ store, name: 'Shop' });