export interface IUserProfile {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_phone?: string;
  gender?: 'm' | 'f';
  address?: string;
}