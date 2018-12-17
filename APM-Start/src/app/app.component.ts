import { MessageService } from './messages/message.service';
import { Router, Event, NavigationStart,
         NavigationEnd, NavigationError,
         NavigationCancel} from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';
    loading: boolean = true;

    constructor(private authService: AuthService,
                private router: Router,
                public messageService: MessageService) { 
        this.router.events.subscribe((routerEvent:  Event) => {
            this.checkRouterEvent(routerEvent);
        });
    }

    logOut(): void {
        this.authService.logout();
        this.router.navigateByUrl('/welcome')
    }

    checkRouterEvent(routerEvent: Event): void {
        if (routerEvent instanceof NavigationStart) {
            this.loading = true;
        }

        if (routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {
            this.loading = false;
        }
    }

    displayMessages(): void {
        this.router.navigate([{outlets:{popup: ['messages']}}]);
        this.messageService.isDisplayed = true;

        /* se quisiera enrutar a miltiples  rutas*/
        /*  this.router.navigate([{outlets:{
            primary:['/products', product.id, 'edit'],
            popup: ['summary', product.id]
        }}]); */
    }
    
    hideMessages(): void {
        this.router.navigate([{outlets:{popup: null}}]);
        this.messageService.isDisplayed = false;
    }
}
