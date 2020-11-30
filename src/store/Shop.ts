import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { IProduct, TCategory, IDictionary, IProductPromotion } from '@/types';
import { ShopService } from '@/services';

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

}

// register module (could be in any file) 
export const ShopStore = new ShopModule({ store, name: 'Shop' });