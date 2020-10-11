import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditEmailDialogComponent } from './edit-email-dialog/edit-email-dialog.component';
import { UpdateEmail } from '../models/update-email.model';
import { SnackBarService } from '../services/snack-bar.service';
import { EditPasswordDialogComponent } from './edit-password-dialog/edit-password-dialog.component';
import { UpdatePassword } from '../models/update-password.model';
import { OrderService } from '../admin/orders/order.service';
import { Order } from '../models/order.model';
import { EditAddressDialogComponent } from './edit-address-dialog/edit-address-dialog.component';
import { Address } from '../models/address.model';
import { OrderProductsDialogComponent } from '../admin/orders/order-products-dialog/order-products-dialog.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: Observable<User>;
  currentUserFullName: Observable<string>;
  public displayedColumns = [
    'createdAt',
    'updatedAt',
    'total',
    'status',
    'details',
  ];
  public data: Order[] = [];
  public isLoading = true;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
    private snackBarService: SnackBarService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.currentUserFullName = this.currentUser.pipe(
      map((user) => user && user.fullName)
    );
    this.orderService.getByUserId().subscribe((orders) => {
      this.data = orders;
      this.isLoading = false;
    });
  }

  changeEmail() {
    const dialogRef = this.dialog.open(EditEmailDialogComponent, {
      data: this.authService.currentUserValue.email,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updateEmail: UpdateEmail = {
          email: this.authService.currentUserValue.email,
          newEmail: result,
        };
        this.userService.updateEmail(updateEmail).subscribe(
          () => {
            this.authService.logout();
            this.snackBarService.open(
              'Email successfully updated, please login again'
            );
          },
          (err) => {
            this.snackBarService.open(err.error);
          }
        );
      }
    });
  }

  changePassword() {
    const dialogRef = this.dialog.open(EditPasswordDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatePassword: UpdatePassword = {
          email: this.authService.currentUserValue.email,
          password: result.password,
          newPassword: result.newPassword,
        };
        this.userService.updatePassword(updatePassword).subscribe(
          () => {
            this.authService.logout();
            this.snackBarService.open(
              'Password successfully updated, please login again'
            );
          },
          (err) => {
            this.snackBarService.open(err.error);
          }
        );
      }
    });
  }

  changeAddress() {
    const dialogRef = this.dialog.open(EditAddressDialogComponent, {
      data: this.authService.currentUserValue.address,
    });
    dialogRef.afterClosed().subscribe((result: Address) => {
      if (result) {
        this.userService.updateAddress(result).subscribe(() => {
          this.snackBarService.open('Address updated successfully');
        });
      }
    });
  }

  openProductsDialog(row: Order) {
    this.dialog.open(OrderProductsDialogComponent, { data: row.products });
  }

  getOrderTotal(row: Order) {
    let total = 0;

    if (row.products) {
      row.products.forEach((product) => {
        total += product.price;
      });
    }

    return total;
  }
}
