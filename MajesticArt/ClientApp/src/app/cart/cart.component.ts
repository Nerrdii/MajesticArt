import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { TaxService } from '../services/tax.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public items: Observable<Product[]>;
  public subtotal$: Observable<number>;
  public taxes$: Observable<number>;
  public isFreeShipping$: Observable<boolean>;
  public shippingRate$: Observable<number>;
  public total$: Observable<number>;
  public authenticated: boolean;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private taxService: TaxService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.authenticated = user != null;
    });

    this.shippingRate$ = this.taxService.getShippingRate();

    this.items = this.cartService.items$.pipe(
      tap((products) => {
        this.subtotal$ = this.taxService.getSubtotal(products);
        this.taxes$ = this.taxService.getTax(products);
        this.total$ = this.taxService.getTotal(products);
        this.isFreeShipping$ = this.taxService.isFreeShipping(products);
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
