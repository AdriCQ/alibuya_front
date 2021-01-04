import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { IProduct, IDictionary, ISuggestedParams, IProductCategoryLink, IProductCategory, IProductTypeLink, IProductType, IPaginatedCategoryProductsParam, IPaginatedTypeProductsParam } from '@/types';
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
  get categoriesLink(): IProductCategoryLink[] {
    const links: IProductCategoryLink[] = [
      {
        labelLang: {
          es: "Todos",
          en: "All",
        },
        tag: 'all',
        to: {
          name: 'shop.home'
        }
      }
    ];
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
              type: tKey.toString(),
              category: key
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
  async getProductsByCategory(_params: IPaginatedCategoryProductsParam) {
    try {
      const _resp = (await ShopService.getProductsByCategory(_params)).data;
      if (_resp.STATUS) {
        if (!this.products[_params.category]) {
          this.products[_params.category] = [];
        }
        this.products[_params.category] = _resp.DATA.data;
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
   * Get Product by Type
   * @param _productId number
   */
  async getProductsByType(_type: IPaginatedTypeProductsParam) {
    try {
      const _resp = (await ShopService.getProductsByType(_type)).data;
      if (_resp.STATUS) {
        if (!this.products[_type.type]) {
          this.products[_type.type] = [];
        }
        this.products[_type.type] = _resp.DATA.data;
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

  getCategoryByTag(_tag: string, _link = false): IProductCategoryLink | IProductCategory | undefined {
    let category!: IProductCategoryLink | IProductCategory;
    if (_link) {
      this.categoriesLink.forEach((cat) => {
        if (cat.tag === _tag) {
          category = cat;
          return cat;
        }
      })
    }
    else {
      this.categories.forEach(cat => {
        if (cat.tag === _tag) {
          category = cat;
          return cat;
        }
      })
    }
    return category;
  }

  /**
   * Gets subcategories by tag
   * @param _tag string
   * @param _link boolean
   * @returns subcategories by tag 
   */
  getSubcategoriesByTag(_tag: string, _link = false): Array<IProductType | IProductTypeLink> {
    const subcategories: Array<IProductTypeLink | IProductType> = [];
    this.categories.forEach((cat) => {
      if (cat.tag == _tag) {
        if (_link) {
          cat.types?.forEach((type, keyType) => {
            subcategories.push({
              labelLang: type.title,
              tag: type.tag,
              to: {
                name: "shop.type",
                query: {
                  type: keyType.toString(),
                  category: keyType,
                },
              },
            });
          });
        } else {
          cat.types?.forEach((type, keyType) => {
            subcategories.push({
              labelLang: type.title,
              tag: type.tag,
              to: {
                name: "shop.type",
                query: {
                  type: keyType.toString(),
                  category: keyType,
                },
              },
            });
          });
        }
      }
    });
    return subcategories;
  }

}

// register module (could be in any file) 
export const ShopStore = new ShopModule({ store, name: 'Shop' });