import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError, debounceTime, take, switchMap } from 'rxjs/operators';

import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class NewEmailValidator {
  constructor(private userService: UserService) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (control === null || control.value === null) {
        return of(null);
      }

      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        switchMap((_) =>
          this.userService.doesEmailExist(control.value).pipe(
            map((doesExist) => (doesExist ? { doesExist: true } : null)),
            catchError(() => of(null))
          )
        )
      );
    };
  }
}
