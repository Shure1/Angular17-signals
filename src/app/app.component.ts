import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from '@api/products.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private readonly productSvc: ProductsService) {}

  public products$ = this.productSvc.products;
}
