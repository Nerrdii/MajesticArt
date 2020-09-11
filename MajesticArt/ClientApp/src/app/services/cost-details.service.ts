import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TotalCost } from '../models/cost-details.model';

@Injectable({
  providedIn: 'root',
})
export class CostDetailsService {
  constructor(private http: HttpClient) {}

  public getCostDetails(productIds: string) {
    return this.http.get<TotalCost>(
      `/api/costdetails/?productIds=${productIds}`
    );
  }
}
