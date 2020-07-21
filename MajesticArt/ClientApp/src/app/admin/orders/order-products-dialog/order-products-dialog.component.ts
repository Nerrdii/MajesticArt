import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-order-products-dialog',
  templateUrl: './order-products-dialog.component.html',
  styleUrls: ['./order-products-dialog.component.css'],
})
export class OrderProductsDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product[]) {}

  ngOnInit() {}
}
