import axios from 'axios';
import { IProduct, ApiResponsePaginated, ApiResponse, ISuggestedParams, ISuggestedCategoryProductParams, IProductCategory, IGetAnnouncementParams, IAnnouncement, IAnnouncementsParams, IPaginatedCategoryProductsParam, IPaginatedTypeProductsParam } from '@/types';


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
  static getProductsByCategory(_params: IPaginatedCategoryProductsParam): ApiResponsePaginated<IProduct[]> {
    return axios.get(this.baseUrl + '/category/products', {
      params: _params
    })
  }

  /**
   * Gets categories
   * @returns  
   */
  static getCategories(): ApiResponse<IProductCategory[]> {
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

  /**
   * Gets products by type
   * @param _params 
   * @returns products by type 
   */
  static getProductsByType(_params: IPaginatedTypeProductsParam): ApiResponsePaginated<IProduct[]> {
    return axios.get(this.baseUrl + '/category/type/products', {
      params: _params
    })
  }

  /**
   * Gets announcements
   * @param _param IGetAnnouncementParams
   * @returns announcements 
   */
  static getAnnouncements(_param: IAnnouncementsParams): ApiResponsePaginated<IAnnouncement[]> {
    return axios.get(this.baseUrl + '/ann', {
      params: _param
    });
  }

  /**
   * Gets announcement by id
   * @param _param 
   * @returns announcement by id 
   */
  static getAnnouncementById(_param: IGetAnnouncementParams): ApiResponsePaginated<IAnnouncement> {
    return axios.get(this.baseUrl + '/ann/by-id', {
      params: _param
    });
  }

  static getHomeAnnouncements(): ApiResponse<IAnnouncement[]> {
    return axios.get(this.baseUrl + '/ann/home');
  }
}