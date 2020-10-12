export type TDepartment = 'automotriz' | 'cell' | 'electronic' | 'home' | 'child' | 'health' | 'market'

/**
 * 
 */
export interface ILinkIconLabel {
  icon?: string;
  label?: string;
  to?: string;
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