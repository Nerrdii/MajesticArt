import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from '../models/category.model';
import { Product, ProductStatus } from '../models/product.model';
import { CategoryService } from '../admin/categories/category.service';
import { ProductService } from '../admin/products/product.service';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  authenticated: boolean;
  initialProducts: Observable<Product[]>;
  visibleProducts: Observable<Product[]>;
  categories: Observable<Category[]>;
  selectedCategoryId: BehaviorSubject<number> = new BehaviorSubject(0);
  sortBy: BehaviorSubject<string> = new BehaviorSubject('');

  ACTIVE = ProductStatus.Active;
  SOLD = ProductStatus.Sold;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.authenticated = user != null;
    });

    this.categories = this.categoryService.getAll();
    this.initialProducts = this.productService.getAll();
    this.visibleProducts = combineLatest([
      this.initialProducts,
      this.selectedCategoryId.asObservable(),
      this.sortBy.asObservable(),
      this.cartService.items$,
    ]).pipe(
      map(([products, categoryId, sortBy, cartItems]) => {
        const first = categoryId
          ? products.filter((product) => product.categoryId === categoryId)
          : products;

        const second = first.map((product) => {
          cartItems.forEach((p) => {
            if (p.id === product.id) {
              product.inCart = true;
            }
          });

          return product;
        });

        if (sortBy === 'lth') {
          return second.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'htl') {
          return second.sort((a, b) => b.price - a.price);
        }

        return second.sort((a, b) =>
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

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
