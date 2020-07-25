import { Product } from './product.model';
import { User } from './user.model';

export interface Order {
  id?: number;
  products: Product[];
  status: OrderStatus;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  Received = 1,
  Processing,
  Shipped,
}
