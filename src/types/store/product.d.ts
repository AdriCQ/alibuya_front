
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
}