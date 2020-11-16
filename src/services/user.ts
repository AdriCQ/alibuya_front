import { ILoginParams, ApiResponse, IRegisterParams, IAuthResponse } from '@/types';
import Axios from 'axios';

export class UserService {
  static baseUrl = '/user';

  /**
   * Auth Login Service
   * @param _params ILoginParams
   */
  static login(_params: ILoginParams): ApiResponse<IAuthResponse> {
    return Axios.post(this.baseUrl + '/login', _params);
  }

  /**
   * Auth Register Service
   * @param _params IRegisterParams
   */
  static register(_params: IRegisterParams): ApiResponse<IAuthResponse> {
    return Axios.post(this.baseUrl + '/register', _params);
  }
}