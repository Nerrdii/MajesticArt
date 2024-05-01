import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { CurrentPasswordValidator } from 'src/app/shared/validators/current-password.validator';

export const confirmPasswordValidator: ValidatorFn = (
  control: UntypedFormGroup
): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (newPassword.value !== confirmPassword.value) {
    confirmPassword.setErrors({ ...confirmPassword.errors, noMatch: true });
  }

  return null;
};

@Component({
  selector: 'app-edit-password-dialog',
  templateUrl: './edit-password-dialog.component.html',
  styleUrls: ['./edit-password-dialog.component.css'],
})
export class EditPasswordDialogComponent implements OnInit {
  form = new UntypedFormGroup(
    {
      currentPassword: new UntypedFormControl(
        '',
        [Validators.required],
        [this.currentPasswordValidator.validate()]
      ),
      newPassword: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
        ),
      ]),
      confirmPassword: new UntypedFormControl('', [Validators.required]),
    },
    { validators: confirmPasswordValidator }
  );
  currentPassword = this.form.get('currentPassword');
  newPassword = this.form.get('newPassword');
  confirmPassword = this.form.get('confirmPassword');

  constructor(
    public dialogRef: MatDialogRef<EditPasswordDialogComponent>,
    private currentPasswordValidator: CurrentPasswordValidator
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.dialogRef.close({
      password: this.currentPassword.value,
      newPassword: this.newPassword.value,
    });
  }
}
