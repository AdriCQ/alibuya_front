import { Dictionary, TRouteLink } from '../utils';

export type TNotificationAction = {
  icon: string;
  label?: string;
  to?: { name: string; params?: Dictionary<string> };
};

export interface INotification {
  type: 'error' | 'info' | 'warning' | 'primary' | 'secondary';
  icon?: string;
  content: string[];
  timeout: number;
  action?: TNotificationAction;
  to?: TRouteLink;
}