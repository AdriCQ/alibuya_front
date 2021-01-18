import { IProduct, IUserContact, TImage, IPackProduct } from '@/types';
export interface ISuggestedParams {
  tags?: string[];
}

export interface ISuggestedCategoryProductParams {
  category: string;
  product_cant?: number;
}

export interface IProductForm extends IProduct {
  type: string;
  department: string;
  upload_images?: TImage[];
  upload_image?: TImage;
}

interface IPaginatedProductsParam {
  cant?: number;
  page?: number;
}

export interface IPaginatedCategoryProductsParam extends IPaginatedProductsParam {
  category: string;
}

export interface IPaginatedTypeProductsParam extends IPaginatedProductsParam {
  type: string;
}

export interface IStorePackParam {
  delivery_method: string;
  destinataries: IUserContact[];
  products: IPackProduct[];
}