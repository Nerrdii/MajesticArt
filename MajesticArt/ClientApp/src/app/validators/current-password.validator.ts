import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError, debounceTime, take, switchMap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class CurrentPasswordValidator {
  constructor(private authService: AuthService) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (control === null || control.value === null) {
        return of(null);
      }

      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        switchMap((_) =>
          this.authService.isCurrentPasswordCorrect(control.value).pipe(
            map((isCorrect) => (!isCorrect ? { notCurrent: true } : null)),
            catchError(() => of(null))
          )
        )
      );
    };
  }
}
