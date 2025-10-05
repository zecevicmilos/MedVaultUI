
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ToastService } from '../../core/toast.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';        // << ovo
@Component({
    selector: 'app-navbar', standalone: true, templateUrl: './navbar.component.html', styleUrls: ['./navbar.component.scss']


    , imports: [CommonModule, RouterLink, RouterLinkActive], // << OVO dodaj
})
export class NavbarComponent {
    constructor(public auth: AuthService, public router: Router, public toast: ToastService) { }
    logout() { this.auth.logout(); this.router.navigate(['/login']); this.toast.show('Logged out', 'info'); }
}