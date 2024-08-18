import { Component, inject, input, Input, OnInit, Signal, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/store/shopping-cart.store';
import { SVGS } from '@shared/utils/svg';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export default class DetailsComponent implements OnInit{
  /* @Input({alias:'id'}) productId!:number; */
  starsArray:number[] = new Array(5).fill(0);
  productId = input<number>(0, {alias:'id'});
  product!: Signal<Product | undefined>
  constructor(private productSvs: ProductsService, private readonly _sanitizer: DomSanitizer) {
  }
  cartStore = inject(CartStore);
  ngOnInit(): void {
    //call service
    this.product = this.productSvs.getProductById(this.productId());
  }

  onAddToCart(product: Product){
    this.cartStore.addToCart(product);
  }

  generateSVG(index:number) {
    let svgContent = null;
    const rate = this.product()?.rating.rate as number;

    if(index + 1 <= Math.floor(rate)) {
      svgContent = SVGS['1'];
    }else if (index < rate) {
      svgContent = SVGS['2'];
    } else {
      svgContent = SVGS['3'];
    }
    /* aplicamos esto para poder insertar svg en el DOM */
    return this._sanitizer.bypassSecurityTrustHtml(svgContent);
  }

}
