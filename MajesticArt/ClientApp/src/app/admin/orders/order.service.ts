import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from 'src/app/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/orders');
  }

  public getByUserId(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/orders/user');
  }

  public update(order: Order): Observable<Order> {
    return this.http.put<Order>('/api/orders', order);
  }
}
