import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(private router: Router) { }
    quotes() {
        this.router.navigate(['/quotes']);
    }
    logout() {
        localStorage.removeItem('jwt');

        // Redirect to the login page.
        this.router.navigate(['/auth']);
    }

}
