import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export const confirmPasswordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  return newPassword &&
    confirmPassword &&
    newPassword.value !== confirmPassword.value
    ? { confirmPassword: true }
    : null;
};

@Component({
  selector: 'app-edit-password-dialog',
  templateUrl: './edit-password-dialog.component.html',
  styleUrls: ['./edit-password-dialog.component.css'],
})
export class EditPasswordDialogComponent implements OnInit {
  form = new FormGroup(
    {
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: confirmPasswordValidator }
  );
  currentPassword = this.form.get('currentPassword');
  newPassword = this.form.get('newPassword');
  confirmPassword = this.form.get('confirmPassword');

  constructor(public dialogRef: MatDialogRef<EditPasswordDialogComponent>) {}

  ngOnInit() {}

  onSubmit() {
    this.dialogRef.close({
      password: this.currentPassword.value,
      newPassword: this.newPassword.value,
    });
  }
}
