import { CanDeactivate } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { AuthGuard } from './user/auth-guard.service';


const ROUTES = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'products', CanDeactivate: [AuthGuard], loadChildren:'app/products/product.module#ProductModule'}, /* para  lazy Loading */
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
]

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, {enableTracing: true})        
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}