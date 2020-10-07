import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { SnackBarService } from '../services/snack-bar.service';
import { NewEmailValidator } from '../shared/validators/new-email.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, Validators.email],
      [this.newEmailValidator.validate()]
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormGroup({
      line1: new FormControl('', Validators.required),
      line2: new FormControl(''),
      city: new FormControl('', Validators.required),
      state: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
      ]),
      zipCode: new FormControl('', [
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
