/**
 * -----------------------------------------
 * Products
 * -----------------------------------------
 */

export interface IProduct {
  title: string;
  price: number;
  img: string;
  weight?: number;
  description?: string[];
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
}

export type TDepartment = 'clothes' | 'automotriz' | 'cell' | 'home' | 'child' | 'health' | 'market'
