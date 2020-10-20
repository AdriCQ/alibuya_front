import { SERVICE_CONFIG } from "./config";
import { ApiResponse, IProduct, ISuggesedParams, ApiResponsePaginated } from '@/types';
import Axios from 'axios';

class ShopServiceClass {
  private baseUrl = SERVICE_CONFIG + '/shop';

  /**
   * Get Sugegsted products
   * @param _params ISuggesedParams
   */
  suggested(_params: ISuggesedParams): ApiResponse<IProduct[]> {
    return Axios.get(this.baseUrl + '/product/suggested', {
      params: _params
    })
  }

  /**
   * Get all products paginated
   */
  allPaginated(): ApiResponsePaginated<IProduct[]> {
    return Axios.get(this.baseUrl + '/product/all-paginated');
  }

}

export const ShopService = new ShopServiceClass();