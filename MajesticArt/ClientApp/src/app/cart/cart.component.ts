import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { TaxService } from '../services/tax.service';
import { TotalCost } from '../models/total-cost.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public items: Observable<Product[]>;
  public totalCost$: Observable<TotalCost>;
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

    this.items = this.cartService.items$.pipe(
      tap((products) => {
        const productIds = products
          .map((product) => product.id)
          .join(',')
          .toString();
        this.totalCost$ = this.taxService.getTotalCostDetails(productIds);
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
