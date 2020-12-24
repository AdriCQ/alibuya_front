import { ITransletable, IProduct } from '@/types';
/**
 * Iannouncement
 */
export interface IAnnouncement {
  id?: number;
  title: ITransletable;
  prints?: number;
  tags?: string[];
  active?: boolean;
  priority?: number;
  type: string;
  options?: IAnnouncementOptions;
}

/**
 * Iannouncement with products
 */
export interface IAnnouncementWithProducts extends IAnnouncement {
  products: IProduct[];
}

/**
 * Iannouncement options
 */
export interface IAnnouncementOptions {
  text?: string;
  product?: string;
  category?: string;
  subcategory?: string;
}