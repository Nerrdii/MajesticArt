import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories');
  }

  public add(category: Category): Observable<Category> {
    return this.http.post<Category>('/api/categories', category);
  }

  public update(category: Category): Observable<Category> {
    return this.http.put<Category>('/api/categories', category);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/categories/${id}`);
  }
}
