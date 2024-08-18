import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable, runInInjectionContext, signal } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/models/product.interface';
import {toSignal} from '@angular/core/rxjs-interop'
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient, private _injector: EnvironmentInjector ) {
    this.getProducts();
   }
  public products = signal<Product[]>([])
  private readonly _endPoint = environment.apiURL;

  public getProducts(){
    this.http.get<Product[]>(`${this._endPoint}/products/?sort=desc`).pipe
    (map(
      (products:Product[]) => products.map((product: Product) => ({...product, qty: 1}))
    ),
    tap((data: Product[]) => this.products.set(data))).subscribe();
  }

  public getProductById(id: number){ 
    return runInInjectionContext(this._injector, () => 
      toSignal<Product>(this.http.get<Product>(`${this._endPoint}/products/${id}`))
    );
  }
}
