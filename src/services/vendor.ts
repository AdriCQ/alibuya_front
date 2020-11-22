import axios from 'axios';
import { ApiResponse, IVendor } from '@/types';

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

}