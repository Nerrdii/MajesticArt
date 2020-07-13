import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public items$: Observable<Product[]>;

  get items() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
  }

  set items(products: Product[]) {
    localStorage.setItem('cartItems', JSON.stringify(products));
  }

  constructor() {
    this.itemsSubject.next(this.items);
    this.items$ = this.itemsSubject.asObservable();
  }

  addToCart(product: Product) {
    this.items = [...this.items, product];
    this.itemsSubject.next(this.items);
  }

  removeProduct(productId: number) {
    this.items = this.items.filter((product) => product.id !== productId);
    this.itemsSubject.next(this.items);
  }
}
