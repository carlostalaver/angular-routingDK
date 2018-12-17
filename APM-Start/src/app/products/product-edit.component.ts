import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../messages/message.service';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './app/products/product-edit.component.html',
    styleUrls: ['./app/products/product-edit.component.css']
})
export class ProductEditComponent  implements OnInit{
    pageTitle: string = 'Product Edit';
    errorMessage: string;
    // product: IProduct | null;
    id: number;
    contador = 0;
    private dataIsValid: {[key:string]: boolean} = {};
    private currentProduct: IProduct;
    private originalProduct: IProduct;

    constructor(private productService: ProductService,
        private messageService: MessageService,
        private router: ActivatedRoute,
        private route: Router) { }

    get product(): IProduct {
        console.log('%cLlamada al get', 'color:orange')
        return this.currentProduct;
    }

    set product(value: IProduct) {
        console.log('%cLlamada al set', 'color:pink')
        this.currentProduct = value;
        this.originalProduct = Object.assign({}, value);
    }

    get isDirty(): boolean {
        return JSON.stringify(this.originalProduct)!== JSON.stringify(this.currentProduct);
    }

    reset(): void {
        this.dataIsValid = null;
        this.currentProduct = null;
        this.originalProduct = null;
    }

    ngOnInit(): void {
        /* SIN USAR RESOLVER DE RUTA */
        /* Usando Instantanea se usa una o la otra */
        this.id = +this.router.snapshot.params['id']; 
        this.router.snapshot.paramMap.get('id'); // o getAll(); de angular 4+
        
        /* Usando observables */
        this.router.paramMap.subscribe(parametros => {
            this.id = +parametros.get('id')
           // this.getProduct(this.id); lo comenté porque ahora usaré el resolve
        });        

        /* USANDO RESOLVER DE RUTA */
        // 1- con instantanea
        //  this.onProductRetrieved(this.router.snapshot.data['product']);

        // 2-con observable
        this.router.data.subscribe( data => {
            this.onProductRetrieved(data['product']);
        })
       
    }

    getProduct(id: number): void {
        this.productService.getProduct(id)
            .subscribe(
                (product: IProduct) => this.onProductRetrieved(product),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onProductRetrieved(product: IProduct): void {
        this.product = product;

        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () =>{
                            this.onSaveComplete(`${this.product.productName} was deleted`)
                            console.log('producto eliminado');
                            this.route.navigate(['/products']);
                        },
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveProduct(): void {
        if (this.isValid(null)) {
            this.productService.saveProduct(this.product)
                .subscribe(
                    () => {
                        this.onSaveComplete(`${this.product.productName} was saved`);
                        this.route.navigate(['/products']);
                    },
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }
        this.reset();
        // Navigate back to the product list
        this.route.navigate(['/products']);
    }

    isValid(path: string): boolean {
        console.log('llamando a isValid');
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    validate(): void {
        console.log('llamando a validate');
        this.dataIsValid = {};

        //tag 'info'
        if (this.product.productName && this.product.productName.length >= 3 && this.product.productCode ) {
            this.dataIsValid['info'] = true;
        } else  {
            this.dataIsValid['info'] = false;
        }

        //tag 'tags'
        if (this.product.category && this.product.category.length >= 3 ) {
            this.dataIsValid['tags'] = true;
        } else  {
            this.dataIsValid['tags'] = false;
        }
    }
}
