import { OrderItem } from './order-item';
import { UserInfo } from '@cuba-platform/rest';

export declare type OrderStatus = 'COOKING' | 'DELIVERING' | 'FINISHED' | 'CANCELED';

export class Order {
  id: string;
  user: UserInfo;
  orderItems: OrderItem[];
  status: OrderStatus;
  createTs: Date;
}
