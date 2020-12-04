import { IProductOptions, TCategory } from '@/types';

export interface INewProduct {
  title: string;
  brand?: string;
  tax?: number;
  description?: string;
  price: number;
  images: TImage[];
  weight: number;
  options?: IProductOptions;
  tags: TCategory[] | string[];
  cant: number;
  type: string;
  department: string;
}
