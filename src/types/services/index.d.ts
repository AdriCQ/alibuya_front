import { AxiosResponse } from 'axios';

/**
 * @interface IApiResponse<T>
 */
interface IApiResponse<T> {
  STATUS: boolean;
  DATA: T;
  ERRORS: never;
}

interface IPaginatedData<T> {
  data: T;
  current_page: number;
  first_page_url: string;
  from: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
}

interface IApiResponsePaginated<T> {
  STATUS: boolean;
  DATA: IPaginatedData<T>;
  ERRORS: never;
}

/**
 * @type ApiResponse<T>
 */
export type ApiResponse<T> = Promise<AxiosResponse<IApiResponse<T>>>;
export type ApiResponsePaginated<T> = Promise<AxiosResponse<IApiResponsePaginated<T>>>;