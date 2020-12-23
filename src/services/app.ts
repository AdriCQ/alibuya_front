import { IClientIpInfo } from '@/types';
import axios, { AxiosResponse } from 'axios';
/**
 * App services
 */
export class AppServices {
  /**
   * client info
   * @returns Promise<AxiosResponse<IClientIpInfo>>
   */
  static ipClientInfo(): Promise<AxiosResponse<IClientIpInfo>> {
    return axios.get('http://api.wipmania.com/jsonp?callback=?');
  }
}