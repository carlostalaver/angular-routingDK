import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './app/products/product-detail.component.html'
})
export class ProductDetailComponent {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;

    constructor(private productService: ProductService,
                private router: ActivatedRoute) { }

    ngOnInit(): void{
        this.product = this.router.snapshot.data['product'];

        /* para tabajar sin el resolver */
       // const id = +this.router.snapshot.params['id'];         
       // this.getProduct(id);
    }


    /* No necesito este metodo porque le pasare al componente
     la informacion que necesita a traves de un resolver */
    getProduct(id: number) {
        this.productService.getProduct(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }
}
