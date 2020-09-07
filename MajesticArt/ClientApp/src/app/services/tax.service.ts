import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TotalCost } from '../models/total-cost.model';

@Injectable({
  providedIn: 'root',
})
export class TaxService {
  constructor(private http: HttpClient) {}

  public getTotalCostDetails(productIds: string) {
    return this.http.get<TotalCost>(`/api/tax/total?productIds=${productIds}`);
  }
}
