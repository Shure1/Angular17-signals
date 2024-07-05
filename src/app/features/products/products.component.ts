import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ProductsService } from '@api/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export default class ProductsComponent {
  constructor(private productSvc: ProductsService) {
  }
  public product$ = this.productSvc.products;

}
