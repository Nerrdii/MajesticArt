import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public items: Observable<Product[]>;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.items = this.cartService.items$;
  }

  removeProduct(product: Product) {
    this.cartService.removeProduct(product.id);
  }
}
