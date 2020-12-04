import { IUserProfile, TImage, IProductImage } from '@/types';

export type TVendorTags = 'clothes' | 'cell';
/**
 * Ivendor
 */
export interface IVendor {
  id?: number;
  image?: IProductImage;
  title: string;
  description: string;
  tags: TVendorTags[];
  active?: boolean;
}

export interface INewVendor extends IVendor {
  image: TImage;
}

export interface IVendorColaborator extends IUserProfile {
  status: boolean;
}
