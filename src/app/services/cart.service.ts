import { Injectable } from '@angular/core';
import {Cart} from '../shop/models/cart';
import {Product} from '../shop/models/product';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CartService {

  constructor() { }

  private cartSubject = new Subject<Cart[]>();
  Cart = this.cartSubject.asObservable();

  cartContent: Cart[] = this.getCart();
  showCart = 'closed';

  addToCart(product: Product) {
    if (this.cartContent && this.cartContent.length === 0) {
      this.showCart = 'open';
    }
    this.cartContent.push({
      id: product.id,
      qty: 1,
      name: product.name,
      price: product.price,
      totalPrice: product.price,
      thumbnailimage: product.thumbnailimage
    });
    this.saveCart(this.cartContent);
  }

  removeFromCart(id: number) {
    this.cartContent = this.cartContent.filter((item) =>  item.id !== id );
    this.saveCart(this.cartContent);
  }

  getCart() {
    let cartItems = JSON.parse(window.localStorage.getItem('cart'));
    return (cartItems ? cartItems : []);
  }

  saveCart(cart: Cart[]) {
    window.localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(<Cart[]>this.cartContent);
  }
}
