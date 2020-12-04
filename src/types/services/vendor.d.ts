import { IProduct, IVendor, IImage } from '@/types';

export interface IStoreVendorProductParams extends IProduct {
  vendor_id: number;
}

export interface IVendorForm extends IVendor {
  upload_image?: IImage;
}