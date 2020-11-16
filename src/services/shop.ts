import { IProduct, ISuggesedParams, ApiResponsePaginated } from '@/types';
import Axios from 'axios';

export class ShopService {
  private static baseUrl = '/shop';

  /**
   * Get Sugegsted products
   * @param _params ISuggesedParams
   */
  static suggested(_params?: ISuggesedParams): ApiResponsePaginated<IProduct[]> {
    return Axios.get(this.baseUrl + '/product/suggested', {
      params: _params
    })
  }

  /**
   * Get all products paginated
   */
  static allPaginated(): ApiResponsePaginated<IProduct[]> {
    return Axios.get(this.baseUrl + '/product/all-paginated');
  }
}