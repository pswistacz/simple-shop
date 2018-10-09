import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { CartComponent } from './cart/cart.component';
import { ProductsItemComponent } from './products-item/products-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductsListComponent, CartComponent, ProductsItemComponent],
  exports: [ProductsListComponent, CartComponent]
})
export class ShopModule { }
