import { Product } from './product.model';
import { User } from './user.model';

export interface Order {
  id?: number;
  products: Product[];
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
