import { IProductCart, IColor } from '@/types';

export interface IBreakpoints<T> {
    xs: T;
    sm: T;
    md: T;
    lg: T;
    xl: T;
}
export type TItemsToShow = IBreakpoints<number>;

// prop [items] for v-data-table in CartGrid.vue
export interface IProductCartInTable {
    title: string,
    color: IColor,
    size: string,
    price: number,
    cant: number,
    total: number,
    product: IProductCart
}
