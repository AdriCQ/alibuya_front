import { IUserProfile, TImage } from '@/types';

export type TVendorTags = 'clothes' | 'cell';
/**
 * Ivendor
 */
export interface IVendor {
  id?: number;
  image?: TImage;
  title: string;
  description: string;
  tags: TVendorTags[];
  active?: boolean;
}

export interface IVendorColaborator extends IUserProfile {
  status: boolean;
}
