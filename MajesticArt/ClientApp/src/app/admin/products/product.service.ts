import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  public add(product: Product): Observable<Product> {
    return this.http.post<Product>('/api/products', product);
  }

  public update(product: Product): Observable<Product> {
    return this.http.put<Product>('/api/products', product);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/products/${id}`);
  }
}
