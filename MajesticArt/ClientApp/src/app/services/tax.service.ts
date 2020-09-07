import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { TotalCost } from '../models/total-cost.model';

@Injectable({
  providedIn: 'root',
})
export class TaxService {
  constructor(private http: HttpClient) {}

  public getTotalCostDetails(productIds: string) {
    return this.http.get<TotalCost>(`/api/tax/total?productIds=${productIds}`);
  }

  public getSubtotal(products: Product[]) {
    let subtotal = 0;

    products.forEach((product) => (subtotal += product.price));

    return of(subtotal);
  }

  public getTax(products: Product[]) {
    return this.getSubtotal(products).pipe(
      switchMap((subtotal) =>
        this.getTaxRate().pipe(map((rate) => subtotal * rate))
      )
    );
  }

  public getTotal(products: Product[]) {
    const tax$ = this.getTax(products);
    const subtotal$ = this.getSubtotal(products);
    const shippingRate$ = this.getShippingRate();
    const isFreeShipping$ = this.isFreeShipping(products);

    const totalBeforeShipping = subtotal$.pipe(
      switchMap((subtotal) => tax$.pipe(map((tax) => subtotal + tax)))
    );
    const totalWithShipping = totalBeforeShipping.pipe(
      switchMap((total) => shippingRate$.pipe(map((rate) => total + rate)))
    );

    return isFreeShipping$.pipe(
      switchMap((isFreeShipping) =>
        isFreeShipping ? totalBeforeShipping : totalWithShipping
      )
    );
  }

  public isFreeShipping(products: Product[]) {
    const subtotal$ = this.getSubtotal(products);

    return subtotal$.pipe(
      switchMap((subtotal) =>
        this.getFreeShippingMin().pipe(
          map((freeShippingMin) => subtotal >= freeShippingMin)
        )
      )
    );
  }

  private getTaxRate() {
    return this.http.get<number>('/api/tax/tax-rate');
  }

  public getShippingRate() {
    return this.http.get<number>('/api/tax/shipping-rate');
  }

  private getFreeShippingMin() {
    return this.http.get<number>('/api/tax/free-shipping-min');
  }
}
