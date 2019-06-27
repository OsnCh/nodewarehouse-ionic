import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenAuthModel } from '../shared/models/auth/tokenAuth.model';
import { SignInGoogleModel } from '../shared/models/auth/signInGoogle.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SignInAuthModel } from '../shared/models/auth/signIn.model';
import { SignUpAuthModel } from '../shared/models/auth/signUp.model';

@Injectable()
export class AuthService{

    constructor(private httpClient: HttpClient){}

    public signInByGoogle(token: string): Observable<TokenAuthModel>{
        let signInModel = {
            accessToken: token,
            clientId: environment.googleClientKey
        } as SignInGoogleModel;
        return this.httpClient.post<TokenAuthModel>(`${environment.apiUrl}auth/signIn/google`, signInModel);
    }

    public signInByFacebook(token: string): Observable<TokenAuthModel>{
        return this.httpClient.get<TokenAuthModel>(`${environment.apiUrl}auth/signIn/facebook/${token}`);
    }

    public confirmEmail(token: string): Observable<string>{
        return this.httpClient.get(`${environment.apiUrl}auth/confirm/${token}`, {responseType: 'text'});
    }

    public login(model: SignInAuthModel): Observable<TokenAuthModel>{
        return this.httpClient.post<TokenAuthModel>(`${environment.apiUrl}auth/signIn`, model);
    }

    public registration(model: SignUpAuthModel): Observable<string>{
        return this.httpClient.post(`${environment.apiUrl}auth/signUp`, model, {responseType: 'text'});
    }

}