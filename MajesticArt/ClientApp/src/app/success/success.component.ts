import { Component, OnInit } from '@angular/core';

import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.emptyCart();
  }
}
