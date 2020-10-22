export type TDepartment = 'automotriz' | 'cell' | 'electronic' | 'home' | 'child' | 'health' | 'market'

/**
 * 
 */
export interface ILinkIconLabel {
  icon?: string;
  label?: string;
  to?: {
    name?: string;
    path?: string;
    query?: Dictionary<string | (string | null)[]>;
    params?: Dictionary<string | (string | null)[]>;
  } | string;
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
