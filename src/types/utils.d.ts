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

interface IDictionary<T> {
  [Key: string]: T;
}

export interface ICity {
  id: number;
  code: string;
  name: string;
}

export interface ICountry {
  code: string;
  name: string;
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
  text?: string;
  value?: string;
}

export type TStatusColor = 'error' | 'info' | 'warning' | 'success' | 'primary' | 'secondary';