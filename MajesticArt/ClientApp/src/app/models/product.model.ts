import { Category } from './category.model';

export interface Product {
  id?: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: Category;
}
