import {Component, Input} from '@angular/core';
import {Product} from '../models/product';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent {
  @Input() product: Product;
  constructor(private cartService: CartService) { }

  addToCart(item: Product) {
    this.cartService.addToCart(item);
  }

  checkElementIsInCart(item) {
    let cartContent = this.cartService.getCart();
    for (let i = 0; i < cartContent.length; i++) {
      if (cartContent[i].id === item.id) {
        return true;
      }
    }
  }
}

