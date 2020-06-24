import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user.model';
import { UpdateEmail } from '../models/update-email.model';
import { UpdatePassword } from '../models/update-password.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return this.http.post<User>('/api/auth/register', values).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  login(values: { email: string; password: string }) {
    return this.http.post<User>('/api/auth/login', values).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  updateEmail(updateEmail: UpdateEmail) {
    return this.http.put('/api/auth/update/email', updateEmail).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  updatePassword(updatePassword: UpdatePassword) {
    return this.http
      .put('/api/auth/update/password', updatePassword)
      .pipe(catchError((err) => throwError(err)));
  }

  isCurrentPasswordCorrect(password: string) {
    return this.http.get<boolean>(`/api/auth/password?password=${password}`);
  }

  doesEmailExist(email: string) {
    return this.http.get<boolean>(`/api/auth/email?email=${email}`);
  }
}
