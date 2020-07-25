import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { OrderService } from './order.service';
import { Order, OrderStatus } from 'src/app/models/order.model';
import { OrderProductsDialogComponent } from './order-products-dialog/order-products-dialog.component';
import { UpdateOrderDialogComponent } from './update-order-dialog/update-order-dialog.component';

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
    'status',
    'products',
    'edit',
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

  updateOrderStatus(row: Order) {
    const dialogRef = this.dialog.open(UpdateOrderDialogComponent, {
      data: row.status,
    });
    dialogRef.afterClosed().subscribe((result: OrderStatus) => {
      if (result) {
        const newOrder: Order = {
          ...row,
          status: result,
          updatedAt: new Date(),
        };
        this.orderService.update(newOrder).subscribe(() => {
          this.orderService.getAll().subscribe((orders) => {
            this.data = orders;
          });
        });
      }
    });
  }
}
