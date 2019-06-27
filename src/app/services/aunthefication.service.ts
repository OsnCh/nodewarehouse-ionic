import * as jwt from 'jsonwebtoken';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppUserModel } from '../shared/models/appUser.model';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

const userLocalStorageKey = 'AppUser';
const tokenLocalStorageKey = 'AppToken';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private googlePlusService: GooglePlus,
        private facebookService: Facebook) { }

    logIn(token: string) {
        this.saveUserByToken(token);
        let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.router.navigateByUrl(returnUrl);
    }

    logOut() {
        localStorage.removeItem(userLocalStorageKey);
        let servicesLogOut = async () => {
            await this.googlePlusService.logout();
            await this.facebookService.logout();
        };
        servicesLogOut();
        console.log(this.router.url);
    }

    isLogined() {
        if (this.getUserData()) {
            return true;
        }
        return false;
    }

    saveUserData(user: AppUserModel) {
        localStorage.setItem(userLocalStorageKey, JSON.stringify(user));
    }

    getUserData(): AppUserModel {
        try {
            let user = JSON.parse(localStorage.getItem(userLocalStorageKey));
            return this.validateUser(user);
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    getToken(): string {
        try {
            const token = localStorage.getItem(tokenLocalStorageKey);
            if (!token) {
                return null;
            }
            if (this.isTokenExpired(token)) {
                this.logOut();
                throw new Error("Token is expired")
            }
            return token;
        } catch{
            return null;
        }
    }

    clear() {
        localStorage.removeItem(userLocalStorageKey);
        localStorage.removeItem(tokenLocalStorageKey);
    }

    private validateUser(userObj: any): AppUserModel {
        if (!userObj || !userObj.role) {
            return null;
        }

        return userObj;
    }

    saveUserByToken(token: string) {
        localStorage.setItem(tokenLocalStorageKey, token);
        let user = this.validateUser(this.decodeToken(token));
        this.saveUserData(user);
    }

    private decodeToken(token: string, options?: jwt.DecodeOptions): null | { [key: string]: any } | string {
        return jwt.decode(token, options);
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = this.decodeToken(token) as any;

        if (decoded.exp === undefined) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) {
            return true;
        }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }
}