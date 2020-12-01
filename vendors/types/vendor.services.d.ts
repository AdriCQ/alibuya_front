import { IProduct } from '@/types';

export interface IStoreVendorProductParams extends IProduct {
  vendor_id: number;
}