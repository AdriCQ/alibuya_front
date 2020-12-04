import axios from 'axios';
import { IProduct, ApiResponsePaginated, ApiResponse, ISuggestedParams, ISuggestedCategoryProductParams } from '@/types';
export class ShopService {
  private static baseUrl = '/shop';

  /**
   * Get Sugegsted products
   * @param _params ISuggesedParams
   */
  static suggested(_params?: ISuggestedParams): ApiResponsePaginated<IProduct[]> {
    return axios.get(this.baseUrl + '/product/suggested', {
      params: _params
    })
  }

  /**
   * Get all products paginated
   */
  static allPaginated(): ApiResponsePaginated<IProduct[]> {
    return axios.get(this.baseUrl + '/product/all-paginated');
  }

  /**
   * Get product by id
   */
  static getById(_id: number): ApiResponse<IProduct> {
    return axios.get(this.baseUrl + '/product/by-id', {
      params: {
        "product_id": _id
      }
    })
  }

  /**
   * Get products by Category
   */
  static getProductsByCategory(_params: string): ApiResponsePaginated<IProduct[]> {
    return axios.get(this.baseUrl + '/category/products', {
      params: {
        "category": _params
      }
    })
  }

  /**
   * Gets categories
   * @returns  
   */
  static getCategories() {
    return axios.get(this.baseUrl + '/category');
  }

  /**
   * Gets suggested category products
   * @param _params ISuggestedCategoryProductParams
   * @returns  
   */
  static getSuggestedCategoryProducts(_params: ISuggestedCategoryProductParams): ApiResponse<IProduct[]> {
    return axios.get(this.baseUrl + 'category/suggested-products', {
      params: _params
    });
  }
}