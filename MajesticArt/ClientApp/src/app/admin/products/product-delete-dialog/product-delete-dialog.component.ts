import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.css'],
})
export class ProductDeleteDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product) {}

  ngOnInit() {}
}
