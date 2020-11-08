import { IDictionary, TRouteLink, TStatusColor } from '@/types';

export type TNotificationAction = {
  icon: string;
  label?: string;
  to?: { name: string; params?: IDictionary<string> };
};

export interface INotification {
  type: TStatusColor;
  icon?: string;
  content: string[];
  timeout: number;
  action?: TNotificationAction;
  to?: TRouteLink;
}