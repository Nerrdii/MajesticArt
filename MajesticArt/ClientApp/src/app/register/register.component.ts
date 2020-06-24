import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { SnackBarService } from '../services/snack-bar.service';
import { NewEmailValidator } from '../validators/new-email.validator';

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
  });
  email = this.registerForm.get('email');
  password = this.registerForm.get('password');
  firstName = this.registerForm.get('firstName');
  lastName = this.registerForm.get('lastName');

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
        (err) => this.snackBarService.openSnackBar(err.error, null, 3000)
      );
    }
  }
}
