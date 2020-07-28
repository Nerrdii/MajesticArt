import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrderService } from '../admin/orders/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  public order$: Observable<Order>;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.order$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = +params.get('id');
        return this.orderService.get(id);
      })
    );
    this.order$.subscribe((order) => console.log(order));
  }
}
