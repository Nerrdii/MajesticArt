import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { SnackBarService } from '../services/snack-bar.service';
import { NewEmailValidator } from '../shared/validators/new-email.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new UntypedFormGroup({
    email: new UntypedFormControl(
      '',
      [Validators.required, Validators.email],
      [this.newEmailValidator.validate()]
    ),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/),
    ]),
    firstName: new UntypedFormControl('', [Validators.required]),
    lastName: new UntypedFormControl('', [Validators.required]),
    address: new UntypedFormGroup({
      line1: new UntypedFormControl('', Validators.required),
      line2: new UntypedFormControl(''),
      city: new UntypedFormControl('', Validators.required),
      state: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(2),
      ]),
      zipCode: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(5),
      ]),
    }),
  });
  email = this.registerForm.get('email');
  password = this.registerForm.get('password');
  firstName = this.registerForm.get('firstName');
  lastName = this.registerForm.get('lastName');
  addressLine1 = this.registerForm.get('address.line1');
  addressLine2 = this.registerForm.get('address.line2');
  city = this.registerForm.get('address.city');
  state = this.registerForm.get('address.state');
  zipCode = this.registerForm.get('address.zipCode');

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private newEmailValidator: NewEmailValidator
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        () => this.router.navigateByUrl('/'),
        (err) => this.snackBarService.open(err.error)
      );
    }
  }
}
