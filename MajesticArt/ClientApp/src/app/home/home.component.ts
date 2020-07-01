import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';

import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { CategoryService } from '../admin/categories/category.service';
import { ProductService } from '../admin/products/product.service';
import { switchMap, map, filter, tap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  initialProducts: Observable<Product[]>;
  visibleProducts: Observable<Product[]>;
  categories: Observable<Category[]>;
  selectedCategoryId: BehaviorSubject<number> = new BehaviorSubject(0);
  sortBy: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getAll();
    this.initialProducts = this.productService.getAll();
    this.visibleProducts = combineLatest([
      this.initialProducts,
      this.selectedCategoryId.asObservable(),
      this.sortBy.asObservable(),
    ]).pipe(
      map(([products, categoryId, sortBy]) => {
        const first = categoryId
          ? products.filter((product) => product.categoryId === categoryId)
          : products;

        if (sortBy === 'lth') {
          return first.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'htl') {
          return first.sort((a, b) => b.price - a.price);
        }

        return first.sort((a, b) =>
          a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
        );
      })
    );
  }

  onCategoryChange(categoryId: number) {
    this.selectedCategoryId.next(categoryId);
  }

  onSortByChange(sortBy: string) {
    this.sortBy.next(sortBy);
  }
}
