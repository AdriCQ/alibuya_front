import { IProduct, ISuggesedParams, ApiResponsePaginated, ApiResponse } from '@/types';
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

  /**
   * Get product by id
   */
  static getById(_id: number): ApiResponse<IProduct> {
    return Axios.get(this.baseUrl + '/product/by-id', {
      params: {
        "product_id": _id
      }
    })
  }
}