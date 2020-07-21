import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../shared/material/material.module';

import { AdminAuthGuard } from './admin-auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditDialogComponent } from './categories/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './categories/delete-dialog/delete-dialog.component';
import { ProductsComponent } from './products/products.component';
import { ProductEditDialogComponent } from './products/product-edit-dialog/product-edit-dialog.component';
import { ProductDeleteDialogComponent } from './products/product-delete-dialog/product-delete-dialog.component';
import { ProductImageDialogComponent } from './products/product-image-dialog/product-image-dialog.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      { path: 'categories', component: CategoriesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
    ],
    canActivate: [AdminAuthGuard],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    CategoriesComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    ProductsComponent,
    ProductEditDialogComponent,
    ProductDeleteDialogComponent,
    ProductImageDialogComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  entryComponents: [
    EditDialogComponent,
    DeleteDialogComponent,
    ProductEditDialogComponent,
    ProductDeleteDialogComponent,
    ProductImageDialogComponent,
  ],
  providers: [AdminAuthGuard],
})
export class AdminModule {}
