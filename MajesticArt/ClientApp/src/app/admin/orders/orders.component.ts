import { Component, OnInit } from '@angular/core';

import { OrderService } from './order.service';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  public displayedColumns = ['id', 'name', 'email', 'createdAt', 'updatedAt'];
  public data: Order[] = [];
  public isLoading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getAll().subscribe((orders) => {
      this.isLoading = false;
      this.data = orders;
    });
  }
}
