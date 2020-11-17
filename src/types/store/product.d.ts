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
  img: string | File[];
  weight?: number;
  options?: IProductOptions;
  brand?: string;
  tags?: TDepartment[] | string[];
  rating?: number;
  suggested?: boolean;
  cant?: number;
}
/**
 * 
 */
export interface IProductOptions {
  colors?: string[];
  size?: string;
  // sizes?: number[];
}

export interface IProductsPack {
  title: string;
  products: IProductCart[];
  weight: number;
  price: number;
  cant?: number;
  destinataries?: TPackDestinationPerson[];
}

export type TDepartment = 'clothes' | 'automotriz' | 'cell' | 'home' | 'child' | 'health' | 'market'
