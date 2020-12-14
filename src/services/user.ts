import { ILoginParams, ApiResponse, IRegisterParams, IAuthResponse, IResetPasswordParams } from '@/types';
import axios from 'axios';

export class UserService {
  static baseUrl = '/user';

  /**
   * Auth Login Service
   * @param _params ILoginParams
   */
  static login(_params: ILoginParams): ApiResponse<IAuthResponse> {
    return axios.post(this.baseUrl + '/login', _params);
  }

  /**
   * Auth Register Service
   * @param _params IRegisterParams
   */
  static register(_params: IRegisterParams): ApiResponse<IAuthResponse> {
    return axios.post(this.baseUrl + '/register', _params);
  }

  /**
   * Requests password reset email
   * @param _email 
   * @returns  
   */
  static requestPasswordResetEmail(_email: string): ApiResponse<null> {
    return axios.get(this.baseUrl + '/password-reset', {
      params: {
        email: _email
      }
    });
  }

  /**
   * Resets password
   * @param _params IResetPasswordParams
   * @returns password  ApiResponse<IAuthResponse>
   */
  static resetPassword(_params: IResetPasswordParams): ApiResponse<IAuthResponse> {
    return axios.post(this.baseUrl + '/password-reset', _params);
  }
}