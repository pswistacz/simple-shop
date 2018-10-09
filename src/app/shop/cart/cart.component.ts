import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Cart} from '../models/cart';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('collapse', [
      state('open', style({ height: '*', display: 'block' })),
      state('closed', style({ height: '0' })),
      transition('closed <=> open', animate('200ms ease-in')),
    ])
  ]
})
export class CartComponent implements OnInit {
  cartProducts: Cart[];
  totalPrice: number;
  state = 'closed';
  collapseTitle = 'Show Cart';

  constructor(private cartService: CartService) {
    cartService.Cart.subscribe((cartProducts) => {
      this.cartProducts = cartProducts;
      this.countTotalPrice();
      if (this.cartService.showCart === 'open') {
        this.state = this.cartService.showCart;
      }
    });
  }

  collapse() {
    this.state = (this.state === 'closed' ? 'open' : 'closed');
    this.state === 'closed' ? this.collapseTitle = 'Show Cart' : this.collapseTitle = 'Hide Cart';
  }

  ngOnInit() {
    this.getCartItems();
    this.countTotalPrice();
  }

  getCartItems() {
   this.cartProducts = this.cartService.getCart();

  }

  add(i: number) {
    this.cartProducts[i].qty += 1;
    this.cartProducts[i].totalPrice += this.cartProducts[i].price;
    return this.cartService.saveCart(this.cartProducts);
  }

  remove(id, i: number) {
    this.cartProducts[i].qty -= 1;
    this.cartProducts[i].qty === 0 ? this.cartService.removeFromCart(id) : this.cartProducts[i].totalPrice -= this.cartProducts[i].price;
    return this.cartService.saveCart(this.cartProducts);
  }

  countTotalPrice() {
    this.totalPrice = this.cartProducts
      .map((cartProducts) => cartProducts.totalPrice)
      .reduce((prev, next) => prev + next, 0);
  }
}
