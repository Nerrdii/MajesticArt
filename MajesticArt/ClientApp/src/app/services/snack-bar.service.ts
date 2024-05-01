import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, action: string = null, duration: number = 3000) {
    return this.snackBar.open(message, action, {
      duration,
    });
  }
}
