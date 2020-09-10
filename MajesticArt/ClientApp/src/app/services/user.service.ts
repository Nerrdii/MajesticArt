import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UpdateEmail } from '../models/update-email.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { UpdatePassword } from '../models/update-password.model';
import { User } from '../models/user.model';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateEmail(updateEmail: UpdateEmail) {
    return this.http.put('/api/auth/email', updateEmail).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  updatePassword(updatePassword: UpdatePassword) {
    return this.http
      .put('/api/auth/password', updatePassword)
      .pipe(catchError((err) => throwError(err)));
  }

  updateAddress(address: Address) {
    return this.http.put('/api/auth/address', address).pipe(
      tap(() => {
        const user: User = JSON.parse(localStorage.getItem('currentUser'));
        user.address = address;
        localStorage.setItem('currentUser', JSON.stringify(user));
        // TODO: this.currentUserSubject.next(user);
      }),
      catchError((err) => throwError(err))
    );
  }

  isCurrentPasswordCorrect(password: string) {
    return this.http.get<boolean>(`/api/auth/password?password=${password}`);
  }

  doesEmailExist(email: string) {
    return this.http.get<boolean>(`/api/auth/email?email=${email}`);
  }
}
