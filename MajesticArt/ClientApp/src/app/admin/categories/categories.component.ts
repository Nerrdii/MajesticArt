import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from 'src/app/models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public displayedColumns = ['id', 'name', 'edit', 'delete'];
  public data: Category[] = [];
  public isLoading = true;

  constructor(private dialog: MatDialog, private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe((categories) => {
      this.isLoading = false;
      this.data = categories;
    });
  }

  openEditDialog(row: Category) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newCategory = { id: row.id, name: result };
        this.categoryService.update(newCategory).subscribe(() => {
          this.categoryService.getAll().subscribe((categories) => {
            this.data = categories;
          });
        });
      }
    });
  }

  openDeleteDialog(row: Category) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.delete(row.id).subscribe(() => {
          this.categoryService.getAll().subscribe((categories) => {
            this.data = categories;
          });
        });
      }
    });
  }
}
