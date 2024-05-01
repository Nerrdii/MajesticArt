import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { Product } from 'src/app/models/product.model';
import { CategoryService } from '../../categories/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css'],
})
export class ProductEditDialogComponent implements OnInit {
  productForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
    image: new UntypedFormControl(''),
    price: new UntypedFormControl('', [Validators.required, Validators.min(1)]),
    category: new UntypedFormControl(''),
  });
  name = this.productForm.get('name');
  description = this.productForm.get('description');
  image = this.productForm.get('image');
  price = this.productForm.get('price');
  category = this.productForm.get('category');

  categories: Category[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<ProductEditDialogComponent>,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.name.setValue(this.data.name);
    this.description.setValue(this.data.description);
    this.image.setValue(this.data.image ? this.data.image : '');
    this.price.setValue(this.data.price);
    this.category.setValue(this.data.category ? this.data.category.id : '');

    this.categoryService
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }

  onSubmit() {
    this.productForm.markAllAsTouched();
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
}
