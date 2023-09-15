import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, Route, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PermissionService {
    constructor(private router: Router) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // check if user is logged in
        // if not logged in, redirect to login page
        // otherwise, return true
        const token = localStorage.getItem('jwt');
        if (token) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PermissionService).canActivate(next, state);
};
