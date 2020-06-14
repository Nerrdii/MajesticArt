import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { EditDialogComponent } from './categories/edit-dialog/edit-dialog.component';
import { FormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './categories/delete-dialog/delete-dialog.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { MaterialModule } from '../shared/material/material.module';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    children: [{ path: 'categories', component: CategoriesComponent }],
    canActivate: [AdminAuthGuard],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    CategoriesComponent,
    EditDialogComponent,
    DeleteDialogComponent,
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
