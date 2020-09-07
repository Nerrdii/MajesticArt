import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { OrderService } from '../admin/orders/order.service';
import { TaxService } from '../services/tax.service';
import { TotalCost } from '../models/total-cost.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  public order$: Observable<Order>;
  public totalCost$: Observable<TotalCost>;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private taxService: TaxService
  ) {}

  ngOnInit() {
    this.order$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = +params.get('id');
        return this.orderService.get(id);
      }),
      tap((order) => {
        const { products } = order;
        const productIds = products
          .map((product) => product.id)
          .join(',')
          .toString();
        this.totalCost$ = this.taxService.getTotalCostDetails(productIds);
      })
    );
  }
}
