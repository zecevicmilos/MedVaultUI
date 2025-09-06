import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
constructor(private auth: AuthService, private router: Router) {}
canActivate(route: ActivatedRouteSnapshot): boolean {
const allowed: string[] = route.data['roles'] || [];
if (!this.auth.isAuthenticated) { this.router.navigate(['/login']); return false; }
if (allowed.length && !allowed.includes(this.auth.role || '')) { this.router.navigate(['/']); return false; }
return true;
}
}