import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminAuthGuard } from './admin-auth.guard';
import { MaterialModule } from '../shared/material/material.module';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminAuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  providers: [AdminAuthGuard],
})
export class AdminModule {}
