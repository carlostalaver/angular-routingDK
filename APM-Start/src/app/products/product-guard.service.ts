import { ProductEditComponent } from './product-edit.component';
import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {


    canDeactivate(component: ProductEditComponent) {
        console.log('%c GUARDIA', 'color: green');
        if (component.isDirty) {
            let productName = component.product.productName || 'New Product';
            return confirm(`navigate away and lose all changes to ${productName}`);
        }
        return true;
    }

}