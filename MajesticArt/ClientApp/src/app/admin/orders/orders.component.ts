import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { OrderService } from './order.service';
import { Order } from 'src/app/models/order.model';
import { OrderProductsDialogComponent } from './order-products-dialog/order-products-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  public displayedColumns = [
    'id',
    'name',
    'email',
    'createdAt',
    'updatedAt',
    'total',
    'products',
  ];
  public data: Order[] = [];
  public isLoading = true;

  constructor(private dialog: MatDialog, private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getAll().subscribe((orders) => {
      this.isLoading = false;
      this.data = orders;
    });
  }

  openProductsDialog(row: Order) {
    this.dialog.open(OrderProductsDialogComponent, { data: row.products });
  }

  getOrderTotal(row: Order) {
    let total = 0;
    row.products.forEach((product) => {
      total += product.price;
    });

    return total;
  }
}
