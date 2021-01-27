import { IColor } from '@/types';
export interface IFormAddToCart {
    color: IColor,
    size: string,
    cant: number,
    check: boolean,
}