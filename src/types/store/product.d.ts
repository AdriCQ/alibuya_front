import { ILinkIconLabel, IShopImage } from '@/types';

/**
 * -----------------------------------------
 * Products
 * -----------------------------------------
 */
/**
 * Iproduct
 */
export interface IProduct {
  id: number;
  title: string;
  brand?: string;
  tax?: number;
  description?: string;
  price: number;
  images?: IShopImage[];
  image?: IShopImage;
  weight?: number;
  options?: IProductOptions;
  tags?: TCategory[] | string[];
  rating?: number;
  suggested?: boolean;
  available_cant?: number;
  type?: string;
}

/**
 * Iproduct options
 */
export interface IProductOptions {
  colors?: string[];
  sizes?: string[];
}
/**
 * Iproduct type
 */
export interface IProductType {
  id?: number;
  title: {
    en?: string;
    es?: string;
  };
  tag: string;
  rating?: number;
}

export interface IProductTypeLink extends ILinkIconLabel {
  tag: string;
  labelLang: {
    es?: string;
    en?: string;
  };
}

/**
 * Iproduct category
 */
export interface IProductCategory { 
  id?: number;
  title: {
    en?: string;
    es?: string;
  };
  tag: string;
  rating?: number;
  types?: IProductType[];
}
export interface IProductCategoryLink extends IProductTypeLink {
  types?: IProductTypeLink[];  
}
/**
 * Iproduct cart
 */
export interface IProductCart extends IProduct {
  cart_cant: number;
}

/**
 * Iproducts pack
 */
export interface IProductsPack {
  title: string;
  products: IProduct[];
  weight: number;
  price: number;
  cant: number;
  destinataries?: TPackDestinationPerson[];
}