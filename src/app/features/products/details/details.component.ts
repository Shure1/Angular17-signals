import { Component, input, Input, OnInit, Signal, signal } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export default class DetailsComponent implements OnInit{
  /* @Input({alias:'id'}) productId!:number; */
  productId = input<number>(0, {alias:'id'});
  product!: Signal<Product | undefined>
  constructor(private productSvs: ProductsService) {
  }
  ngOnInit(): void {
    //call service
    this.product = this.productSvs.getProductById(this.productId);
  }

}
