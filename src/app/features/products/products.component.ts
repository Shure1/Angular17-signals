import { Component, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ProductsService } from '@api/products.service';
import { CartStore } from '@shared/store/shopping-cart.store';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export default class ProductsComponent {
  public product$ = this.productSvc.products;
  public cartStore =  inject(CartStore);
  constructor(private productSvc: ProductsService) {
  }

  public onAddToCart(product: Product): void {
    this.cartStore.addToCart(product);
  }

}
