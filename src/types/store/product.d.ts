import { ILinkIconLabel, TImage } from '@/types';

/**
 * -----------------------------------------
 * Products
 * -----------------------------------------
 */

export interface IProduct {
  id?: number;
  title: string;
  brand?: string;
  tax?: number;
  description?: string;
  price: number;
  images: TImage;
  weight?: number;
  options?: IProductOptions;
  brand?: string;
  tags?: TCategory[] | string[];
  rating?: number;
  suggested?: boolean;
  cant?: number;
  type_id?: number;
}
/**
 * 
 */
export interface IProductOptions {
  colors?: string[];
  sizes?: string[];
  // sizes?: number[];
}
/**
 * 
 */
export interface IProductType {
  id?: number;
  name: string;
}
/**
 * 
 */
export interface IProductCategory extends ILinkIconLabel {
  id?: number;
  labelLang: {
    es?: string;
    en?: string;
  };
  types?: IProductType[];
}
/**
 * 
 */
export interface IProductsPack {
  title: string;
  products: IProductCart[];
  weight: number;
  price: number;
  cant?: number;
  destinataries?: TPackDestinationPerson[];
}

export type TCategory = 'clothes' | 'automotriz' | 'cell' | 'home' | 'child' | 'health' | 'market'
