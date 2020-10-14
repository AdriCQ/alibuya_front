
/**
 * -----------------------------------------
 * Products
 * -----------------------------------------
 */

export interface IProduct {
  title: string;
  price: number;
  img: string;
  description?: string[];
}

export interface IProductCart extends IProduct {
  cant: number;
}