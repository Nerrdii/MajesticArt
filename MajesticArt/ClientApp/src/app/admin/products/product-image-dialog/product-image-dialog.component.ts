import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-product-image-dialog',
  templateUrl: './product-image-dialog.component.html',
  styleUrls: ['./product-image-dialog.component.css'],
})
export class ProductImageDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit() {}
}
