/* Props */
/* Products Containers */
export interface IBreakpoints<T> {
    xs: T;
    sm: T;
    md: T;
    lg: T;
    xl: T;
}
export type TItemsToShow = IBreakpoints<number>;