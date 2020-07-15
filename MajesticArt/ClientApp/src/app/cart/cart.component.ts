import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public items: Observable<Product[]>;
  public subtotal = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.items = this.cartService.items$.pipe(
      tap((products) => {
        this.subtotal = 0;
        products.forEach((product) => (this.subtotal += product.price));
      })
    );
  }

  removeProduct(product: Product) {
    this.cartService.removeProduct(product.id);
  }

  checkout() {
    this.cartService.checkout();
  }
}
