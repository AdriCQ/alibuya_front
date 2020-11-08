import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { IVendor, IVendorColaborator, IProduct } from '@/types';
import { PRODUCTS } from '@/utils';

@Module({ generateMutationSetters: true })
class VendorModule extends VuexModule {
  vendor: IVendor = {
    id: 0,
    description: [],
    title: '',
    type: []
  }

  _myProducts: IProduct[] = PRODUCTS;

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
}

// register module (could be in any file) 
export const VendorStore = new VendorModule({ store, name: 'Vendor' });