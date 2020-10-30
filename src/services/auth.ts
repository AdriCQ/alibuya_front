import { ILoginParams, ApiResponse, IRegisterParams, IAuthResponse } from '@/types';
import Axios from 'axios';

class AuthSericeClass {
  private baseUrl = '/auth';

  /**
   * Auth Login Service
   * @param _params ILoginParams
   */
  login(_params: ILoginParams): ApiResponse<IAuthResponse> {
    return Axios.post(this.baseUrl + '/login', _params);
  }

  /**
   * Auth Register Service
   * @param _params IRegisterParams
   */
  register(_params: IRegisterParams): ApiResponse<IAuthResponse> {
    return Axios.post(this.baseUrl + '/register', _params);
  }
}

/**
 * Instance singleton
 */
export const AuthService = new AuthSericeClass();