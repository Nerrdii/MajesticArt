import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-email-dialog',
  templateUrl: './edit-email-dialog.component.html',
  styleUrls: ['./edit-email-dialog.component.css'],
})
export class EditEmailDialogComponent implements OnInit {
  form = new UntypedFormGroup({
    currentEmail: new UntypedFormControl({ value: '', disabled: true }),
    newEmail: new UntypedFormControl('', [Validators.required, Validators.email]),
  });
  currentEmail = this.form.get('currentEmail');
  newEmail = this.form.get('newEmail');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<EditEmailDialogComponent>
  ) {}

  ngOnInit() {
    this.currentEmail.setValue(this.data);
  }

  onSubmit() {
    this.dialogRef.close(this.newEmail.value);
  }
}
