import { IProduct, ISuggesedParams, ApiResponsePaginated, ApiResponse, TDepartment } from '@/types';
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


  /**
   * Get products by Category
   */
  static getProductsByCategory(_params: TDepartment): ApiResponsePaginated<IProduct[]> {
    return Axios.get(this.baseUrl + '/category', {
      params: {
        "category": _params
      }
    })
  }
}