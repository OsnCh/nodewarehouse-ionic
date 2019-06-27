import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/aunthefication.service';
import { AlertController } from '@ionic/angular';
import { PopupService } from 'src/app/services/popup.service';

@Injectable()
export class ErrorInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private popupService: PopupService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            let errorMessage = '';
            if (err.status == 401) {
                errorMessage = 'Session time is over.'
                this.authenticationService.logOut();
            }
            if (err.status == 403) { errorMessage = 'Access is denied.' }

            if (!err || !errorMessage || err.status == 500) { errorMessage = (err.error) ? err.error : "Internal Server Error." }
            (async () =>  {
                await this.popupService.showPopup(errorMessage, 'Info');
            })();
            const error = err.statusText;
            throw new Error(error);
        }))
    }
}