import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import { OrderStatus } from 'src/app/models/order.model';

@Component({
  selector: 'app-update-order-dialog',
  templateUrl: './update-order-dialog.component.html',
  styleUrls: ['./update-order-dialog.component.css'],
})
export class UpdateOrderDialogComponent implements OnInit {
  public newStatus = this.data;
  public RECEIVED = OrderStatus.Received;
  public PROCESSING = OrderStatus.Processing;
  public SHIPPED = OrderStatus.Shipped;

  constructor(@Inject(MAT_DIALOG_DATA) public data: OrderStatus) {}

  ngOnInit() {}
}
