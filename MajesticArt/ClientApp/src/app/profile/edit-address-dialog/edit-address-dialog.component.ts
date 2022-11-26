import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-edit-address-dialog',
  templateUrl: './edit-address-dialog.component.html',
  styleUrls: ['./edit-address-dialog.component.css'],
})
export class EditAddressDialogComponent implements OnInit {
  form = new UntypedFormGroup({
    line1: new UntypedFormControl(this.data.line1, Validators.required),
    line2: new UntypedFormControl(this.data.line2),
    city: new UntypedFormControl(this.data.city, Validators.required),
    state: new UntypedFormControl(this.data.state, [
      Validators.required,
      Validators.maxLength(2),
    ]),
    zipCode: new UntypedFormControl(this.data.zipCode, [
      Validators.required,
      Validators.maxLength(5),
    ]),
  });
  addressLine1 = this.form.get('line1');
  addressLine2 = this.form.get('line2');
  city = this.form.get('city');
  state = this.form.get('state');
  zipCode = this.form.get('zipCode');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Address,
    public dialogRef: MatDialogRef<EditAddressDialogComponent>
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }
}
