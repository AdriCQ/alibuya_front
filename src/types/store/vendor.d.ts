import { IUserProfile } from '@/types';
export type TVendorType = 'clothes' | 'cell';

export interface IVendor {
  id?: number;
  title: string;
  description: string[] | string;
  type: TVendorType[];
}

export interface IVendorColaborator extends IUserProfile {
  status: boolean;
}
