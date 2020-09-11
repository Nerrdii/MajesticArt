import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { UpdateEmail } from '../models/update-email.model';
import { UpdatePassword } from '../models/update-password.model';
import { User } from '../models/user.model';
import { Address } from '../models/address.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  updateEmail(updateEmail: UpdateEmail) {
    return this.http.put('/api/users/email', updateEmail).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  updatePassword(updatePassword: UpdatePassword) {
    return this.http
      .put('/api/users/password', updatePassword)
      .pipe(catchError((err) => throwError(err)));
  }

  updateAddress(address: Address) {
    return this.http.put('/api/users/address', address).pipe(
      tap(() => {
        const user: User = JSON.parse(localStorage.getItem('currentUser'));
        user.address = address;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authService.currentUserValue = user;
      }),
      catchError((err) => throwError(err))
    );
  }

  isCurrentPasswordCorrect(password: string) {
    return this.http.get<boolean>(`/api/users/password?password=${password}`);
  }

  doesEmailExist(email: string) {
    return this.http.get<boolean>(`/api/users/email?email=${email}`);
  }
}
