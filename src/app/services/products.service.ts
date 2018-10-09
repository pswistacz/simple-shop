import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../shop/models/product';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductsService {
  private apiUrl = "http://www.mocky.io/v2/5bb784073000005700f93a8b";
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
