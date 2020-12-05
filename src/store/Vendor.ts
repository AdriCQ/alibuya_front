import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { IVendor, IVendorColaborator, IProduct } from '@/types';
import { VendorServices } from '@/services';

@Module({ generateMutationSetters: true })
class VendorModule extends VuexModule {
  vendor: IVendor = {
    id: 0,
    description: '',
    image: {
      id: 0,
      paths: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: ''
      }
    },
    title: '',
    tags: []
  }

  _myProducts: IProduct[] = [];

  _colaborators: IVendorColaborator[] = [];

  get myProducts() {
    return this._myProducts;
  }

  /**
   * Delete a product
   * @param _productKey number
   */
  deleteProduct(_productKey: number) {
    this._myProducts.splice(_productKey, 1);
  }

  /**
   * Add new product
   * @param _product IProduct
   */
  addProduct(_product: IProduct) {
    this._myProducts.unshift(_product);
    console.log(this._myProducts);
  }

  /**
   * Stores vendor module
   * @param _params IVendor
   */
  async store(_params: IVendor) {
    try {
      const _resp = (await VendorServices.store(_params)).data;
      if (_resp.STATUS) {
        this.vendor = _resp.DATA;
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
   * Gets by auth
   */
  async getByAuth() {
    try {
      const _resp = (await VendorServices.getBuAuth()).data;
      if (_resp.STATUS) {
        this.vendor = _resp.DATA;
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
}

// register module (could be in any file) 
export const VendorStore = new VendorModule({ store, name: 'Vendor' });