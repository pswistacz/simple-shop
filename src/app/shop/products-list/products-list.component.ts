import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../models/product';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[];
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  sortElements(sort: string) {
    this.products = this.products.sort((a, b) => (a[sort] > b[sort] ? 1 : a[sort] === b[sort] ? 0 : -1));
    if (sort.charAt(0) === '-') {
      sort = sort.slice(1);
      this.products = this.products.sort((a, b) => (a[sort] > b[sort] ? -1 : a[sort] === b[sort] ? 0 : 1));
    }
    return this.products;
  }
}
