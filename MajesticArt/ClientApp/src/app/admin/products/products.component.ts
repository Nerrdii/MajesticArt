import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Product } from 'src/app/models/product.model';
import { ProductService } from './product.service';
import { ProductEditDialogComponent } from './product-edit-dialog/product-edit-dialog.component';
import { ProductDeleteDialogComponent } from './product-delete-dialog/product-delete-dialog.component';
import { ProductImageDialogComponent } from './product-image-dialog/product-image-dialog.component';

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
    'price',
    'category',
    'actions',
  ];
  public data: Product[] = [];
  public isLoading = true;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe((products) => {
      this.isLoading = false;
      this.data = products;
    });
  }

  addProduct() {
    const product: Product = {
      name: '',
      description: '',
      categoryId: null,
      image: '',
      price: null,
    };
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      data: product,
    });
    dialogRef.afterClosed().subscribe((result) => {
      const newProduct: Product = {
        name: result.name,
        categoryId: result.category ? result.category : null,
        description: result.description,
        image: result.image,
        price: result.price,
      };
      this.productService.add(newProduct).subscribe(() => {
        this.productService.getAll().subscribe((products) => {
          this.data = products;
        });
      });
    });
  }

  openEditDialog(row: Product) {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const product: Product = {
          name: result.name,
          categoryId: result.category ? result.category : null,
          description: result.description,
          image: result.image,
          price: result.price,
          id: row.id,
        };
        this.productService.update(product).subscribe(() => {
          this.productService.getAll().subscribe((products) => {
            this.data = products;
          });
        });
      }
    });
  }

  openDeleteDialog(row: Product) {
    const dialogRef = this.dialog.open(ProductDeleteDialogComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(row.id).subscribe(() => {
          this.productService.getAll().subscribe((categories) => {
            this.data = categories;
          });
        });
      }
    });
  }

  openImageDialog(row: Product) {
    this.dialog.open(ProductImageDialogComponent, { data: row.image });
  }
}
