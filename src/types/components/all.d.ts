import { IProductCart, IColor, TRouteLink } from '@/types';

export interface IBreakpoints<T> {
    xs: T;
    sm: T;
    md: T;
    lg: T;
    xl: T;
}
export type TBreakpointsNumber = IBreakpoints<number>;

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

// Components
// Product Base Widget
export interface IProductBaseWidget_title {
    show?: boolean,
    position?: 'top' | 'bottom',
    singleLine?: boolean;
}

export interface IProductBaseWidget_rating {
    show?: boolean;
    color?: string,
    bgColor?: string,
}

// Product Simple Base Widget
export interface IProductSimpleBaseWidget_props {
    title?: string;
    link?: ITextLink;
}

// Ribbon
export interface IRibbon {
    show?: boolean,
    color?: string,
    dark?: boolean,
    light?: boolean
    large?: boolean,
    xLarge?: boolean
}

// Extra
export interface ITextLink {
    show?: boolean,
    to?: TRouteLink,
    title?: string
}