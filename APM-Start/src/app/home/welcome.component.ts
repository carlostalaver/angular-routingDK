import { Component } from '@angular/core';

@Component({
    selector: 'app-home', /* ya no se necesita este selector porque estoy trabajando con enrutamiento */
    templateUrl: './app/home/welcome.component.html'
})
export class WelcomeComponent {
    public pageTitle: string = 'Welcome';
}
