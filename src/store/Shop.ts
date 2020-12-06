import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { IProduct, IDictionary, ISuggestedParams, IProductCategoryLink, IProductCategory, IProductTypeLink } from '@/types';
import { ShopService } from '@/services';
import Storage from '@/utils/Storage';

const storage = new Storage("shopStorage");

/**
 * Module Shop
 */
@Module({ generateMutationSetters: true })
class ShopModule extends VuexModule {
  categories: IProductCategory[] = [];
  suggestedProducts: IProduct[] = [];
  products: IDictionary<IProduct[]> = {};
  productDetails: IProduct | null = null;

  /**
   * Gets categories link
   */
  get categoriesLink(): IProductCategoryLink[]{
    const links: IProductCategoryLink[] = [];
    this.categories.forEach((cat, key) => {
      // Types
      const types: IProductTypeLink[] = [];
      cat.types?.forEach((type, tKey) => {
        types.push({
          labelLang: type.title,
          tag: type.tag,
          to: {
            name: 'shop.type',
            query: {
              type: tKey.toString()
            }
          }
        });
      });
      // Links
      links.push({
        labelLang: cat.title,
        tag: cat.tag,
        types: types,
        to: {
          name: 'shop.category',
          query: {
            category: key.toString()
          }
        }
      })
    })
    return links;
  }

  /**
   * Startups shop module
   */
  async startup() {
    this.loadFromLocalStorage();
    await this.loadCategories();
  }

  /**
   * Loads categories
   */
  async loadCategories() {
    try {
      const _resp = (await ShopService.getCategories()).data;
      if (_resp.STATUS) {
        this.categories = _resp.DATA;
        this.storeOnLocalStorage();
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
   * Gets suggested products
   */
  async getSuggestedProducts(_params: ISuggestedParams) {
    try {
      const _resp = (await ShopService.suggested(_params)).data;
      if (_resp.STATUS) {
        this.suggestedProducts = _resp.DATA.data;
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
        if (!this.products[_category]) {
          this.products[_category] = [];
        }
        this.products[_category] = _resp.DATA.data;
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

  storeOnLocalStorage() {
    storage.store({
      categories: this.categories
    })
  }

  loadFromLocalStorage() {
    const _storage = storage.get();
    if (_storage) {
      if (_storage.categories) {
        this.categories = _storage.categories;
      }
    }
  }

}

// register module (could be in any file) 
export const ShopStore = new ShopModule({ store, name: 'Shop' });