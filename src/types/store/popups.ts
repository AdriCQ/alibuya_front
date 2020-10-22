export interface INotification {
  type: 'error' | 'info' | 'warning' | 'primary' | 'secondary';
  icon?: string;
  content: string[];
}