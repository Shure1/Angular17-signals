import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/models/product.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient, ) {
    this.getProducts();
   }
  public products = signal<Product[]>([])
  private readonly _endPoint = environment.apiURL;

  public getProducts(){
    this.http.get<Product[]>(`${this._endPoint}?sort=desc`).pipe(tap((data: Product[]) => this.products.set(data))).subscribe();
  }

  public getProduct(id: number){
    return this.http.get<Product>(`${this._endPoint}/${id}`);
  }
}
