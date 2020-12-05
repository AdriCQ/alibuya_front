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
  title: string;
  tag: string;
}
/**
 * Iproduct category
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

/**
 * Iproduct promotion
 */
export interface IProductPromotion {
  title: string;
  products: IProduct[];
}