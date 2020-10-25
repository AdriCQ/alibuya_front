export type TRouteLink = {
  name?: string;
  path?: string;
  query?: Dictionary<string | (string | null)[]>;
  params?: Dictionary<string | (string | null)[]>;
} | string;
/**
 * 
 */
export interface ILinkIconLabel {
  icon?: string;
  label?: string;
  to?: TRouteLink;
}

interface Dictionary<T> {
  [Key: string]: T;
}

/**
 * -----------------------------------------
 * Vuetify
 * -----------------------------------------
 */

/**
 * 
 */
export interface IVSelectItem {
  text: string;
  value: string;
}
