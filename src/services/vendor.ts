import axios from 'axios';
import { ApiResponse, IProduct, IStoreVendorProductParams, IVendor } from '@/types';

export class VendorServices {
  static baseUrl = '/vendor';

  /**
   * Stores vendor services
   * @param _params IVendor
   * @returns store ApiResponse<IVendor>
   */
  static store(_params: IVendor): ApiResponse<IVendor> {
    return axios.post(this.baseUrl, _params);
  }

  /**
   * Get vendor by Auth
   * @returns ApiResponse<IVendor>
   */
  static getBuAuth(): ApiResponse<IVendor> {
    return axios.get(this.baseUrl + '/by-auth');
  }

  /**
   * Stores product
   * @param _params IStoreVendorProductParams
   * @returns IProduct 
   */
  static storeProduct(_params: IStoreVendorProductParams): ApiResponse<IProduct> {
    return axios.post(this.baseUrl + '/product', _params);
  }

}