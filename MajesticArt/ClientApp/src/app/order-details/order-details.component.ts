import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { OrderService } from '../admin/orders/order.service';
import { TaxService } from '../services/tax.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  public order$: Observable<Order>;
  public subtotal$: Observable<number>;
  public taxes$: Observable<number>;
  public isFreeShipping$: Observable<boolean>;
  public shippingRate$: Observable<number>;
  public total$: Observable<number>;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private taxService: TaxService
  ) {}

  ngOnInit() {
    this.shippingRate$ = this.taxService.getShippingRate();

    this.order$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = +params.get('id');
        return this.orderService.get(id);
      }),
      tap((order) => {
        const { products } = order;
        this.subtotal$ = this.taxService.getSubtotal(products);
        this.taxes$ = this.taxService.getTax(products);
        this.total$ = this.taxService.getTotal(products);
        this.isFreeShipping$ = this.taxService.isFreeShipping(products);
      })
    );
  }
}
