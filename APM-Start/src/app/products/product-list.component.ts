import { Component, OnInit }  from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: "./app/products/product-list.component.html",
  styleUrls: ["./app/products/product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  listFilter: string;
  errorMessage: string;

  products: IProduct[];

  constructor(private productService: ProductService, private router: ActivatedRoute) {}

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.showImage =  Boolean(this.router.snapshot.queryParamMap.get('showImage')) || true;
    this.listFilter = this.router.snapshot.queryParamMap.get('filterBy') || '';
    this.productService
      .getProducts()
      .subscribe(
        products => (this.products = products),
        error => (this.errorMessage = <any>error)
      );
  }
}
