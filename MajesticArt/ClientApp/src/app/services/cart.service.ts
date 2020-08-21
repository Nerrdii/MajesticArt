import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';

import { Product } from '../models/product.model';
import { SnackBarService } from './snack-bar.service';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    this.itemsSubject.next(this.items);
    this.items$ = this.itemsSubject.asObservable();
  }

  addToCart(product: Product) {
    this.items = [...this.items, product];
    this.itemsSubject.next(this.items);
    const snackBarRef = this.snackBarService.open(
      'Item has been added to cart',
      'View cart'
    );
    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['cart']);
    });
  }

  removeProduct(productId: number) {
    this.items = this.items.filter((product) => product.id !== productId);
    this.itemsSubject.next(this.items);
  }

  emptyCart() {
    this.items = [];
    this.itemsSubject.next(this.items);
  }

  async checkout() {
    const stripe = await loadStripe('pk_test_s8rfwzJLPHG843VC3855bk9P');
    this.http.post('/api/checkout', this.items).subscribe((res: any) => {
      stripe.redirectToCheckout({ sessionId: res.sessionId });
    });
  }
}
