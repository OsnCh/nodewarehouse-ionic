import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { LogInAuthGuard } from './guards/logInAuth.guard';
import { LogOutAuthGuard } from './guards/logOutAuth.guard';
import { ApiIntercepter } from './interceptors/api.intercepter';
import { ErrorInterceptor } from './interceptors/error.intercepter';
import { AuthenticationService } from '../services/aunthefication.service';
import { PopupService } from '../services/popup.service';
import { LoaderService } from '../services/loader.service';



@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [],
  exports: [HttpClientModule],
  providers: [
    GooglePlus,
    Facebook,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
   },
   {
     provide: HTTP_INTERCEPTORS,
     useClass: ApiIntercepter,
     multi: true
   },
   LogInAuthGuard,
   LogOutAuthGuard,
   PopupService,
   LoaderService
  ]
})
export class CoreModule { }
