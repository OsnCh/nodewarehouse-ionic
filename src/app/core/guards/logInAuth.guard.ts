import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../services/aunthefication.service';

@Injectable()
export class LogInAuthGuard implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getUserData();
        if (currentUser) {
            return true;
        }
        this.authenticationService.clear();
        this.router.navigate(['/auth'], { queryParams: route.queryParams });
    }
}