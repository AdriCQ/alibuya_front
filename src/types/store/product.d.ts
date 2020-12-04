import { ILinkIconLabel } from '@/types';

/**
 * -----------------------------------------
 * Products
 * -----------------------------------------
 */

export interface IProduct {
  id: number;
  title: string;
  brand?: string;
  tax?: number;
  description?: string;
  price: number;
  images?: IProductImage[];
  image?: IProductImage;
  weight?: number;
  options?: IProductOptions;
  tags?: TCategory[] | string[];
  rating?: number;
  suggested?: boolean;
  cant?: number;
  type?: string;
}
/**
 * 
 */
export interface IProductOptions {
  colors?: string[];
  sizes?: string[];
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
  image: string;
}
/**
 * 
 */
export interface IProductsPack {
  title: string;
  products: IProduct[];
  weight: number;
  price: number;
  cant?: number;
  destinataries?: TPackDestinationPerson[];
}

export type TCategory = 'clothes' | 'automotriz' | 'cell' | 'home' | 'child' | 'health' | 'market';

export interface IProductPromotion {
  title: string;
  products: IProduct[];
}

export interface IProductImage {
  id: number;
  tags?: string[];
  paths: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}