import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  public name: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Category) { }

  ngOnInit() {
    this.name = this.data.name;
  }

}
