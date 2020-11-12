/**
 * -----------------------------------------
 * Products
 * -----------------------------------------
 */

export interface IProduct {
  id?: number;
  title: string;
  price: number;
  img: string | File[];
  weight?: number;
  color?: string;
  brand?: string;
  description?: string[] | string;
}

export interface IProductCart extends IProduct {
  cant: number;
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
