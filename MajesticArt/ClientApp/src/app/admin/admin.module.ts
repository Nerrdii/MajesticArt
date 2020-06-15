import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../shared/material/material.module';

import { AdminAuthGuard } from './admin-auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditDialogComponent } from './categories/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './categories/delete-dialog/delete-dialog.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      { path: 'categories', component: CategoriesComponent },
      { path: 'products', component: ProductsComponent },
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
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  entryComponents: [EditDialogComponent, DeleteDialogComponent],
  providers: [AdminAuthGuard],
})
export class AdminModule {}
