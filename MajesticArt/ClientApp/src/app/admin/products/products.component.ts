import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public displayedColumns = [
    'id',
    'name',
    'description',
    'quantity',
    'price',
    'category',
    'edit',
    'delete',
  ];
  public data: Product[] = [];
  public isLoading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe((products) => {
      this.isLoading = false;
      this.data = products;
    });
  }
}
