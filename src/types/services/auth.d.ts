import { IUserProfile } from '@/types';
/**
 * 
 */
export interface ILoginParams {
  email: string;
  password: string;
}

/**
 * 
 */
export interface IRegisterParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

/**
 * 
 */
export interface IAuthResponse {
  profile: IUserProfile;
  api_token: string;
}